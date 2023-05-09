import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import DeleteRecipe from "./DeleteRecipe";
import { URL } from "./config";
import { showMessage } from "react-native-flash-message";

const FetchRecipe = ({ filter,refresh }) => {
  const [listData, setListData] = useState([]);
  const [pantryItems, setPantryItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchPantryItems = async () => {
    try {
      const res = await fetch(URL + "/fetchPantry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({ testData: "Test data sent to server" }),
      });
      const data = await res.json();
      const listItems = data.Pantry.map((pantry) => ({
        name: pantry.name,
        amount: pantry.amount,
        id: pantry.ourId,
        date: pantry.date,
      }));
      setPantryItems(listItems);
    } catch (err) {
      console.log(err);
    }
  };

  const callAPI = async () => {
    try {
      const res = await fetch(URL + "/fetchRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({ testData: "Test data sent to server" }),
      });
      const data = await res.json();
      if (data.recipes) {
        const listItems = data.recipes.map((recipe) => {
          const ingredients = [
            recipe.ingredient1,
            recipe.ingredient2,
            recipe.ingredient3,
            recipe.ingredient4,
            recipe.ingredient5,
          ].filter(
            (ingredient) => ingredient !== null && ingredient !== undefined && ingredient !== ''
          );
          return {
            name: recipe.name,
            ingredients: ingredients,
            description: recipe.description,
            id: recipe.ourId,
          };
        });
        setListData(listItems);
      }
    } catch (err) {
      console.log(err);
      showMessage({
        message: "Error",
        description: "Failed to fetch recipe list",
        type: "danger",
        backgroundColor: "red",
        color: "white",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchPantryItems();
    callAPI();
  }, [refreshKey,refresh]);

  const renderItem = ({ item }) => {
    const canMake = item.ingredients.every((ingredient) =>
    pantryItems.some((pantryItem) => pantryItem.name.toLowerCase().includes(ingredient.toLowerCase()))
    );

    if (filter === "filtered" && !canMake) return null;

    return (
      <Pressable onPress={() => { setCurrentItem(item); setModalVisible(true); }}>
        <View style={styles.dataItem}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{currentItem && currentItem.name}</Text>
              <Text style={styles.modalSubtitle}>Ingredients:</Text>
              <View style={styles.modalIngredients}>
                {currentItem && currentItem.ingredients.map((ingredient, index) => (
                  <Text key={index}>{ingredient}</Text>
                ))}
              </View>
              <Text style={styles.modalSubtitle}>Description:</Text>
              <Text style={styles.modalDescription}>
                {currentItem && currentItem.description}
              </Text>
              <DeleteRecipe
                recipeId={currentItem && currentItem.id}
                onClose={() => {
                  setRefreshKey((prevKey) => prevKey + 1);
                  setModalVisible(false);
                }}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Pressable>
    );
    };
    
    return (
    <FlatList
    data={listData}
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()}
    extraData={listData}
    />
    );
    };
    
    const styles = StyleSheet.create({
    dataItem: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 20,
    paddingHorizontal: 10,
    },
    title: {
    fontSize: 18,
    },
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    },
    modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
    button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    },
    buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 10,
    },
    textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    },
    modalTitle: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: "center",
    },
    modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    },
    modalIngredients: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    },
    modalDescription: {
    textAlign: "center",
    marginBottom: 20,
    },
    });
    
    export default FetchRecipe;