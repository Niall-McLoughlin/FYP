
import { Button, Text, View, TextInput, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'; // Update this import
import DeletePantry from './DeletePantry';
import { URL } from './config';
import { showMessage } from 'react-native-flash-message';
import UpdateHome from './UpdateHome';

const FetchHome = forwardRef(({ refresh, setPantryItems, onItemsWithoutDate }, ref) => {
  const [listData, setListData] = useState([]);

  const callAPI = async () => {
    console.log('callAPI called');
    try {
      const res = await fetch(URL + '/fetchPantry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify({ testData: 'Test data sent to server' }),
      });
      const data = await res.json();
      const listItems = data.Pantry.map((pantry) => ({
        name: pantry.name,
        amount: pantry.amount,
        id: pantry.ourId,
        date: pantry.date,
        barcode: pantry.barcode
      })).filter(item => item.name == 'unknown'); // Filter out items with the name "unknown"
      setListData(listItems);
      showMessage({
        message: 'Success',
        description: '',
        type: 'success',
        backgroundColor: 'green',
        color: 'white',
        duration: 500,
      });
    } catch (err) {
      console.log(err);
      showMessage({
        message: 'Error',
        description: 'Fetch Unsuccessful',
        type: 'danger',
        backgroundColor: 'red',
        color: 'white',
        duration: 1000,
      });
    }
  };

  // Expose the callAPI function to the parent component
  useImperativeHandle(ref, () => ({
    callAPI,
  }));

  useEffect(() => {
    callAPI();
  }, [refresh]);

  useEffect(() => {
    // Count the items without date
    const count = listData.filter((item) => !item.date || item.date === '').length;

    // Call the callback function with the count of items without date
    if (onItemsWithoutDate) {
      onItemsWithoutDate(count);
    }
  }, [listData]);

  const renderItem = ({ item }) => (
    <View style={styles.dataItem}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Amount:{item.amount}</Text>
      <Text>Date:{item.date}</Text>
      <Text>Barcode:{item.barcode}</Text>

      <DeletePantry productId={item.id} onDelete={() => callAPI()} />
      <UpdateHome productId={item.id}  barcode={item.barcode} onUpdated={() => callAPI()} />
    </View>
  );

  return (
    <View style={styles.fetchAll}>
      <View style={styles.buttonContainer}>
        <Button title="Refresh" onPress={() => callAPI()} />
      </View>
      <FlatList data={listData} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
});

export default FetchHome;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#311b6b',
  },
  textInput: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#e4d0ff',
    backgroundColor: '#bbbbbb',
    borderRadius: 6,
  },
  dataItem: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: '#dddddd',
    borderRadius: 6,
  },
  buttonContainer: {
    margin: 10,
  },
  helperTextFetch: {
    fontSize: 12,
    textAlign: 'center',
    color: '#19a7d9',
  },
  helperTextAdd: {
    color: '#19a7d9',
    fontSize: 16,
    textAlign: 'center',
  },
  b: {
    width: 100,
    marginHorizontal: 8,
  },
  buttonItem: {
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },

    fetchAll: {
      
        marginBottom: 100,
      },
    });
  
