import { StyleSheet, Text, View } from 'react-native';
import AddPantry from '../components/AddPantry';
const AddPantryScreen = () => {
    return (
      <View style={styles.container}>
      <AddPantry />
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

  export default AddPantryScreen;