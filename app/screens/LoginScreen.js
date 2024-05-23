import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     //access token using AsyncStorage
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");

  //       if (token) {
  //         //if token is present, jump automatically to the HomsScreen without requiring user to Login again even when user minimize the app
  //         navigation.navigate("Home");
  //       } else {
  //         //token not found, show the Login screen itself so that user can login
  //       }
  //     } catch (error) {
  //       console.log("Error: ", error);
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);


  // Login function
const handleLogin = () => {
  const user = {
    email: email,
    password: password,
  };


  axios
    .post("http://192.168.0.5:8000/login", user)
    .then((response) => {
      console.log("Login response: ", response);
      const token = response.data.token;
      console.log("Token received: ", token);
      AsyncStorage.setItem("authToken", token);
      navigation.replace("Home");
    })
    .catch((error) => {
      console.error("Login Error: ", error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Response error: ", error.response.data);
        Alert.alert("Login Error", error.response.data.message || "Invalid email or password");
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received: ", error.request);
        Alert.alert("Login Error", "Network Error: No response received from the server");
      } else {
        // Something else caused the error
        console.error("Error setting up request: ", error.message);
        Alert.alert("Login Error", "Network Error: " + error.message);
      }
    });

    console.log("User login details: ", user);
};


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4A55A2", fontWeight: "600" }}>Sign In</Text>
          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Sign In to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>

            <TextInput
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 250,
              }}
              placeholder="enter Your Email"
              placeholderTextColor={"black"}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>

            <TextInput
              style={{
                fontSize: password ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 250,
              }}
              placeholder="Password"
              placeholderTextColor={"black"}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#4A55A2",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{
              marginTop: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 16,
              }}
            >
              Don't have an account ? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

//1hr,13mins
