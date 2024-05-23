import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../../UserContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";


//List of Chats
const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        console.log({userId})
        const response = await fetch(
          `http://192.168.0.5:8000/accepted-friends/${userId}`
        );
        console.log("chat screen response: ", response)

        const data = await response.json();
        console.log({data})
        console.log("chat screen response data: ", data)

        if (response.ok) {
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("error showing the accepted friends:", error.message);
      }
    };

    acceptedFriendsList();
  }, []);

  console.log("friends: ", acceptedFriends);
  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable style={{}}>
      {/* <Text>{acceptedFriends[0].email}</Text> */}
        {acceptedFriends.map((item, index) => {
          console.log({index, item})
          return (

          <UserChat key={index} item={item} />
          )
        })}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});

