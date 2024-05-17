import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { UserType } from "../../UserContext";
import axios from "axios";
import FriendRequest from "../components/FriendRequest";

const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const reponse = await axios.get(
        `http://192.168.0.5:8000/friend-request/${userId}`
      );
      console.log(Response);
      if (response.status === 200) {
        const friendRequestsData = response.data.map((friendRequest) => ({
          _id: friendRequest.id,
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

  console.log(friendRequests);

  return (
    <View
      style={{
        padding: 10,
        marginHorizontal: 12,
      }}
    >
      {friendRequests.length > 0 && <Text>Your Friend Requests</Text>}

      {
        friendRequests.map((item, index) => {
            <FriendRequest

            />
        })
      }

    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
