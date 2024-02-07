import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
  Text,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Animated, { LayoutAnimation } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const ListAnimation = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {}, [data]);

  const getAll = async () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((result) => {
        setData(result.results);
      });
  };

  const AnimatedItem = Animated.createAnimatedComponent(AnimatedView);

  const AnimatedView = (props) => {
    return (
      <Pressable
        style={[
          styles.itemContainer,
          {
            backgroundColor: generateRandomColor(),
          },
        ]}
      ></Pressable>
    );
  };

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `id-${index + 1}`}
        numColumns={3}
        renderItem={({ item, index }) => {
          return <AnimatedItem />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    marginHorizontal: 10,
  },
  itemContainer: {
    width: (width - 20) / 3,
    height: 200,
    marginBottom: 10,
    marginRight: 10,
  },
  image: {},
});

export default ListAnimation;
