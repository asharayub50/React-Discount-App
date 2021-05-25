import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { useState, useEffect } from "react";

// You can import from local files
import AssetExample from "./components/AssetExample";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

export default function App() {
  const [origionalPrice, setOrigionalPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discount, setDiscount, getDiscount] = useState();
  const [finalPrice, setFinalPrice] = useState();
  const CalculateDiscount = () => {
    //  YE WALI LINES HARIS BRO
    setDiscount((discountPercentage / 100) * origionalPrice);
    // useEffect(setDiscount((discountPercentage / 100) * origionalPrice));
    console.log(discount);

    setFinalPrice(origionalPrice - discount);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.statusBarText}>Discount App</Text>
        <View style={styles.statusBarButton}>
          <View style={{ height: 35 }}>
            <Button title="History" color="purple" />
          </View>
        </View>
      </View>

      <View style={styles.input}>
        <Text>Origional Price: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => {
            setOrigionalPrice(val);
          }}
        />
      </View>

      <View style={styles.input}>
        <Text>Discount Percentage: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => {
            setDiscountPercentage(val);
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button1}>
          <Button title="Calculate" color="teal" onPress={CalculateDiscount} />
        </View>
      </View>

      <View style={styles.output}>
        <Text>You Save: {discount}</Text>
      </View>

      <View style={styles.output}>
        <Text>Final Price: {finalPrice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    // padding: 8,
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "7%",
    width: "100%",
    backgroundColor: "teal",
    top: 0,
  },
  statusBarText: {
    color: "white",
    fontSize: 22,
  },
  statusBarButton: {
    // height: 30,
    position: "absolute",
    right: 5,
    // top: 0,
  },
  input: {
    marginLeft: 17,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "baseline",
  },
  output: {
    marginLeft: 17,
    marginVertical: 5,
    // flexDirection: 'row',
    alignItems: "baseline",
  },
  textInput: {
    width: 100,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "teal",
    // borderRadius: 10,
  },
  buttonContainer: {
    // width: 100,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },
  button1: {
    width: 300,
  },
});
