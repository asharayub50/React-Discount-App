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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DataTable, IconButton } from "react-native-paper";

const Stack = createStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const StartScreen = ({ navigation, route }) => {
  React.useEffect(() => {
    if (route.params?.discounts) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      setdiscountHistory(route.params.discounts);
    }
  }, [route.params?.discounts]);

  const [origionalPrice, setorigionalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountHistory, setdiscountHistory] = useState([]);
  const [count, setCount] = useState(0);

  const CalculateDiscount = () => {
    setDiscount((discountPercentage / 100) * origionalPrice);
    setFinalPrice(origionalPrice - (discountPercentage / 100) * origionalPrice);
  };

  const saveCalcultaion = () => {
    let fprice = origionalPrice - (discountPercentage / 100) * origionalPrice;
    var updatedArray = discountHistory;
    updatedArray.push({ origionalPrice, discountPercentage, fprice, count });
    setdiscountHistory(updatedArray);
    setCount(count + 1);
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
            <Button
              title="History"
              color="purple"
              onPress={() => {
                navigation.navigate("History", {
                  discountHistory,
                });
              }}
            />
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

      <View style={styles.buttonContainer}>
        <View style={styles.button1}>
          <Button title="Save" color="teal" onPress={saveCalcultaion} />
        </View>
      </View>
    </View>
  );
};

const History = ({ navigation, route }) => {
  // var discHistory = route.params.discountHistory;'
  var emptyArray = [];
  navigation.setOptions({
    headerTitleAlign: "center",
    headerLeft: () => {
      return (
        <Button
          title="Back"
          color="black"
          onPress={() => navigation.navigate("Start", { discounts })}
        />
      );
    },
  });

  const [discounts, setDiscounts] = useState([]);
  React.useEffect(() => {
    if (route.params?.discountHistory) {
      setDiscounts(route.params?.discountHistory);
    }
  }, [route.params?.discountHistory]);

  const remove = (itemKey) => {
    var list = discounts.filter((item) => item.count != itemKey);
    setDiscounts(list);
    // console.log(discounts);
  };

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Origional</DataTable.Title>
          <DataTable.Title>Discount%</DataTable.Title>
          <DataTable.Title>Final Price</DataTable.Title>
          <DataTable.Title>Delete</DataTable.Title>
        </DataTable.Header>

        {discounts.map((item) => {
          return (
            <DataTable.Row>
              <DataTable.Cell>{item.origionalPrice}</DataTable.Cell>
              <DataTable.Cell>{item.discountPercentage}</DataTable.Cell>
              <DataTable.Cell>{item.fprice}</DataTable.Cell>
              <DataTable.Cell>
                <Button
                  title="delete"
                  color="red"
                  onPress={() => {
                    remove(item.count);
                  }}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      <Button
        title="Clear All"
        color="teal"
        onPress={() => setDiscounts(emptyArray)}
      />
    </View>
  );
};

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
