import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../../UserContext";
import axios from "axios";
import FriendRequest from "../components/FriendRequest";

//List of Friend Requests
const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  console.log("friend requests:", userId);
  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.5:8000/friend-request/${userId}`
      );
      //console.log("fetch request response: ", response);
      if (response.status === 200) {
        const friendRequestsData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));

        setFriendRequests(friendRequestsData);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  console.log("friend requests: ", friendRequests);

  return (
    <View
      style={{
        padding: 10,
        marginHorizontal: 12,
      }}
    >
      {friendRequests.length > 0 && <Text>Your Friend Requests</Text>}
      {/* <Text>{friendRequests[0].email}</Text> */}

      {friendRequests.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
        />
      ))}
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
