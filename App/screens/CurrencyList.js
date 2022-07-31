import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../constants/colors";

const windowWidth = Dimensions.get("window").width;

import CurrencyItem from "../components/CurrencyItem";

export default CurrencyList = ({ navigation, route }) => {
  const [currencies, setCurrencies] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState(
    route.params?.currentCurrency
  );
  const [oppositeCurrency, setOppositeCurrency] = useState(
    route.params?.oppositeCurrency
  );
  const [currenciesType, setCurrenciesType] = useState(
    route.params?.currenciesType
  );
  const [previousCurrenciesType, setPreviousCurrenciesType] = useState(
    route.params?.currenciesType
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    route.params?.loading === true
      ? (setLoading(true), navigation.setParams({ loading: null }))
      : null;
  }, [route.params?.loading]);

  useEffect(() => {
    var url = "https://currencyexchangerateapi.herokuapp.com/currencies";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(data[`${currenciesType}`]);
      })
      .then(() => setLoading(false));
  }, [route.params?.currenciesType]);

  const changeCurrenciesType = () => {
    setLoading(true);

    var url = "https://currencyexchangerateapi.herokuapp.com/currencies";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(
          currenciesType == "currencies" ? data["crypto"] : data["currencies"]
        );
      })
      .then(() => setLoading(false))
      .then(() => {
        currenciesType == "currencies"
          ? setCurrenciesType("crypto")
          : setCurrenciesType("currencies");
      });
  };

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
          onPress={() =>
            navigation.navigate(
              "Home",
              route.params?.fromCurrency
                ? {
                    loading: false,
                    fromInputCurrenciesType: previousCurrenciesType,
                  }
                : {
                    loading: false,
                    toInputCurrenciesType: previousCurrenciesType,
                  }
            )
          }
        >
          <Entypo name="chevron-down" color={colors.white} size={50} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.currencyType}
          activeOpacity={0.5}
          onPress={() => changeCurrenciesType()}
        >
          <View style={styles.currencyTypeTextContainer}>
            <Text
              style={{
                color: colors.white,
                fontSize: 0.06 * windowWidth,
                fontWeight: "bold",
              }}
            >
              {currenciesType == "currencies" ? "Crypto" : "Currencies"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        initialNumToRender={15}
        data={currencies}
        renderItem={({ item }) => (
          <CurrencyItem
            currency={item}
            currenciesType={currenciesType}
            checked={item == currentCurrency ? true : false}
            disabled={item == oppositeCurrency ? true : false}
            onPress={() => {
              navigation.navigate(
                "Home",
                route.params?.fromCurrency
                  ? {
                      fromCurrency: item,
                      loading: true,
                      fromInputCurrenciesType: currenciesType,
                    }
                  : {
                      toCurrency: item,
                      loading: true,
                      toInputCurrenciesType: currenciesType,
                    }
              );
            }}
          />
        )}
        contentContainerStyle={{
          justifyContent: "center",
        }}
      />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={0.2 * windowWidth} color={colors.white} />
        </View>
      ) : null}
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
  loading: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: `${colors.black}99`,
  },
  currencyType: {
    position: "absolute",
    right: "15%",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    borderWidth: 2,
    borderRadius: 60,
    borderColor: colors.white,
  },
  currencyTypeTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
