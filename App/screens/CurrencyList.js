import { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../constants/colors";

import CurrencyItem from "../components/CurrencyItem";

export default CurrencyList = ({ navigation, route }) => {
  const [currencies, setCurrencies] = useState(route.params?.currencies);
  const [currentCurrency, setCurrentCurrency] = useState(
    route.params?.currentCurrency
  );
  const [oppositeCurrency, setOppositeCurrency] = useState(
    route.params?.oppositeCurrency
  );

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.darkBlue, colors.black]}
    >
      <View style={{ height: StatusBar.currentHeight }} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.chevronDown}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Home")}
        >
          <Entypo name="chevron-down" color={colors.white} size={50} />
        </TouchableOpacity>
      </View>
      <FlatList
        initialNumToRender={15}
        data={currencies}
        renderItem={({ item }) => (
          <CurrencyItem
            currency={item}
            checked={item == currentCurrency ? true : false}
            disabled={item == oppositeCurrency ? true : false}
            onPress={() =>
              navigation.navigate(
                "Home",
                route.params?.fromCurrency
                  ? { fromCurrency: item }
                  : { toCurrency: item }
              )
            }
          />
        )}
        contentContainerStyle={{
          justifyContent: "center",
        }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: colors.white,
  },
  chevronDown: {
    marginLeft: "5%",
  },
});
