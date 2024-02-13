import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ReseptiHaku = () => {
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (searchText.trim().length > 0) {
      fetchRecipes();
    }
  }, [searchText]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`);
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.recipeItem}>
      <Text style={styles.title}>{item.strMeal}</Text>
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderRecipe}
        style={styles.list}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter ingredient"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchRecipes}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    width: '70%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  recipeItem: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ReseptiHaku;