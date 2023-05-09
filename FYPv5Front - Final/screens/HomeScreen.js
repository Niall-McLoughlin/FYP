import { Button, Text, View, TextInput, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { useState, useRef } from 'react';
import FetchHome from '../components/FetchHome';
import AddPantry from '../components/AddPantry';
import FlashMessage from 'react-native-flash-message';
import { useFocusEffect } from '@react-navigation/native'; // Add this import
import React from 'react';

const HomeScreen = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);
  const fetchPantryRef = useRef(); // Add this line

  const handleItemAdded = () => {
    setRefresh(!refresh);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (fetchPantryRef.current) {
        fetchPantryRef.current.callAPI();
      }
    }, [])
  );

  return (
    <View>
      <FetchHome ref={fetchPantryRef} refresh={refresh} />
      <FlashMessage position="top" floating={true} />
    </View>
  );
};

export default HomeScreen;

