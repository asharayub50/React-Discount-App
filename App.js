import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  // return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="StartScreen" component={} />
    </Stack.Navigator>
  </NavigationContainer>;
  // );

  const [origionalPrice, setorigionalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const CalculateDiscount = () => {
    setDiscount((discountPercentage / 100) * origionalPrice);
    setFinalPrice(origionalPrice - (discountPercentage / 100) * origionalPrice);
  };

  const setterA = (val) => {
    if (val >= 0) {
      setorigionalPrice(val);
    }
  };
  const setterB = (val) => {
    if (val >= 0 && val <= 100) {
      setDiscountPercentage(val);
    }
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
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(val) => {
            setterA(val);
          }}
        />
      </View>

      <View style={styles.input}>
        <Text>Discount Percentage: </Text>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(val) => {
            setterB(val);
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button1}>
          <Button
            title="Calculate"
            color="teal"
            onPress={() => {
              CalculateDiscount();
            }}
          />
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
