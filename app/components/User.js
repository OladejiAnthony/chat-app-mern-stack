import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { UserType } from "../../UserContext";

const User = ({ item }) => {
  //console.log(item)
  const { userId, setUserId } = useContext(UserType);
  console.log(userId)
  const [requestSent, setRequestSent] = useState(false)


  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response  = await fetch("http://192.168.0.5:8000/friend-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({currentUserId, selectedUserId})
      })

      console.log(response.data)

      if(response.ok) {
        setRequestSent(true);
      }

    } catch(error) {
      console.log("Error message:", error.message)
    }

  }

  return (
    <View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              resizeMode: "cover",
            }}
            source={{ uri: item.Image }}
          />
        </View>

        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
          <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
        </View>

        <Pressable
          onPress={() => sendFriendRequest(userId, item._id)}
          style={{
            backgroundColor: "#567189",
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Add Friend
          </Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});

//1hr, 42mins
