import { StyleSheet, Text, View } from 'react-native';
import AddRecipe from '../components/AddRecipe';
import { useState } from 'react';

const AddRecipeScreen = () => {
  
      // const [refresh, setRefresh] = useState(false);

      // const handleItemAdded = () => {
      //   setRefresh(!refresh);
      // };


    return (
      <View style={styles.container}>
    <AddRecipe />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
     justifyContent: 'center',
    },
    text: {
      
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default AddRecipeScreen;