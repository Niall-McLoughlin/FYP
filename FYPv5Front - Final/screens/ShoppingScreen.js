import { Button, Text, View, TextInput, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { useState } from 'react';
import FetchShopping from '../components/FetchShopping';
import AddShopping from '../components/AddShopping';
import FlashMessage from 'react-native-flash-message';

const ShoppingScreen = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);

  const handleItemAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <View>
      <AddShopping onItemAdded={handleItemAdded} />
      <FetchShopping refresh={refresh} />
      <FlashMessage position="top" floating={true} />
    </View>
  );
};

export default ShoppingScreen;

