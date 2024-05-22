import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import  jwt_decode from "jwt-decode";

const TestComponent = () => {
  useEffect(() => {
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRhNjg5YjQ5ODQ0ZWU3YzVlNGYzZDEiLCJpYXQiOjE3MTYxNTI1ODUsImV4cCI6MTcxNjE1NjE4NX0.jMkAQ49oWD6ti-iiBtNXfqjHQFcngxZEcnzC583F26A'; // Replace with a valid JWT token for testing
    try {
        console.log("jwtDecode:", jwt_decode); // Verify jwt_decode is imported
      const decoded = jwt_decode(testToken);
      console.log("Decoded Token:", decoded);
    } catch (error) {
      console.error("Error in decoding token", error);
    }
  }, []);

  return (
    <View>
      <Text>Check console for decoded token.</Text>
    </View>
  );
};

export default TestComponent;


