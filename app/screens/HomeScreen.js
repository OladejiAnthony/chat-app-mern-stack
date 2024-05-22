import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../../UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
import TestComponent from "../test/TestComponent";


console.log("jwt: ",jwt_decode)


const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  console.log("userId: ", userId)
  const [users, setUsers] = useState([]);

  
  //style header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            onPress={() => navigation.navigate("Chats")}
            name="chatbox-ellipses-outline"
            size={24}
            color="black"
          />
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log("token:", token);

        if (token) {
          axios
            .post(`http://192.168.0.5:8000/usersToken`, {token})
            .then((response) => {
              console.log("response1: ",response.data)
              setUserId(response.data.userId);
            })
            .catch((error) => {
              console.log("error retrieving userId", error);
            });

            //console.log(userId)

          axios
            .get(`http://192.168.0.5:8000/users/${userId}`)
            .then((response) => {
              console.log("response: ",response)
              setUsers(response.data);
            })
            .catch((error) => {
              console.log("error retrieving users", error);
            });
        } else {
          Alert.alert("Error", "No auth token found");
        }
      } catch (error) {
        console.error("Error decoding token or fetching users", error);
      }
    };

    fetchUsers();
  }, [setUserId]);

  console.log("users: ", users);

  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
        {/* <TestComponent /> */}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});


