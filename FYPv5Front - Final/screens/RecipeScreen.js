  // RecipeScreen.js
  import { View, StyleSheet,Button } from 'react-native';
  import { useState } from 'react';
  import { Picker } from '@react-native-picker/picker';
  import FetchRecipe from '../components/FetchRecipe';
  import AddRecipe from '../components/AddRecipe';
  
  const RecipeScreen = ({ navigation }) => {
    const [refresh, setRefresh] = useState(false);
    const [filter, setFilter] = useState('all');
  
    const handleItemAdded = () => {
      setRefresh(!refresh);
    };
  
    const handleFilterChange = (value) => {
      setFilter(value);
      setRefresh(!refresh);
    };
    
    const handleRefreshPress = () => {
      setRefresh(!refresh);
    };
  
    return (
      <View>
        <Picker
          selectedValue={filter}
          onValueChange={(value) => handleFilterChange(value)}
          style={styles.picker}
        >
          <Picker.Item label="All Recipes" value="all" />
          <Picker.Item label="Filtered Recipes" value="filtered" />
        </Picker>
        <Button title="Refresh Recipes" onPress={handleRefreshPress} />
        <FetchRecipe refresh={refresh} filter={filter} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    picker: {
      height: 50,
      width: '100%',
      marginBottom: 20,
    },
  });
  
  export default RecipeScreen;
  