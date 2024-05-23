import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../UserContext";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  //console.log("friendRequests details: ", friendRequests, item)
  const { userId, setUserId } = useContext(UserType);
  console.log("friend request: ", userId)
  const navigation = useNavigation();


  const acceptRequest = async (friendRequestId) => {
    try {
      //console.log({friendRequestId, userId})
      const response = await fetch(
        "http://192.168.0.5:8000/friend-request/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: friendRequestId,
            recepientId: userId,
          }),
        }
      );

      if (!response.ok) {
        //console.log(response)
        throw new Error("Failed to accept friend request");
      }
      
      const result = await response.json();
      //console.log("Accepted friend response: ", result);

      setFriendRequests(
        friendRequests.filter((request) => request._id !== friendRequestId)
      );
      navigation.navigate("Chats");
    } catch (err) {
      console.log("Error accepting the friend request: ", err);
    }
  };

  //console.log("accept friend requests: ", friendRequests);

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: item.image }}
      />

      <Text
        style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10, flex: 1 }}
      >
        {item?.name} sent you a friend request!!
      </Text>

      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});

