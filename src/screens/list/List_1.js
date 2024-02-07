import React, { Component, useState, useEffect, useCallback } from "react";
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
import Animated, {
  LayoutAnimation,
  FadeIn,
  FadeOut,
  ZoomOut,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const ListAnimation1 = () => {
  const [data, setData] = useState([
    "Fade out",
    "Fade In-right",
    "Fade In-left",
    "Fade In-up",
    "Fade In-down",
  ]);

  useEffect(() => {}, [data]);

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  };

  const addItem = () => {
    setData([...data, `item - ${data.length + 1}`]);
  };

  const onDelete = useCallback((itemId) => {
    setData((currentItems) => {
      return currentItems.filter((item) => item !== itemId);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `id-${index + 1}`}
        renderItem={({ item, index }) => {
          return (
            <Animated.View
              style={styles.itemContainer}
              entering={FadeIn.delay(100 * index)}
              exiting={FadeOutUp}
              layout={LinearTransition.delay(100)}
              onTouchEnd={() => onDelete(item)}
            >
              <Text style={styles.text}>{item}</Text>
            </Animated.View>
          );
        }}
      />

      <Pressable
        onPress={() => addItem()}
        style={{
          position: "absolute",
          right: 10,
          bottom: 50,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "black",
          }}
        ></View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  itemContainer: {
    paddingVertical: 20,
    backgroundColor: "red",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default ListAnimation1;
