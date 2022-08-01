import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { setStatusBarStyle } from "expo-status-bar";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

import colors from "../constants/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import Input from "../components/Input";

export default Home = ({ navigation, route }) => {
  const [keyboardShown, setKeyboardShown] = useState();
  const [keyboardHeight, setKeyboardHeight] = useState();
  const [loading, setLoading] = useState(true);
  const [fromInputCurrenciesType, setFromInputCurrenciesType] =
    useState("currencies");
  const [toInputCurrenciesType, setToInputCurrenciesType] =
    useState("currencies");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromCurrencyValue, setFromCurrencyValue] = useState("");
  const [toCurrencyValue, setToCurrencyValue] = useState("");
  const [exchangeRate, setExchangeRate] = useState();
  const [date, setDate] = useState("");

  useEffect(() => {
    route.params?.fromInputCurrenciesType != undefined
      ? setFromInputCurrenciesType(route.params?.fromInputCurrenciesType)
      : null;

    route.params?.toInputCurrenciesType != undefined
      ? setToInputCurrenciesType(route.params?.toInputCurrenciesType)
      : null;
  }, [
    route.params?.fromInputCurrenciesType,
    route.params?.toInputCurrenciesType,
  ]);

  useEffect(() => {
    route.params?.loading === true
      ? (setLoading(true), navigation.setParams({ loading: null }))
      : null;
  }, [route.params?.loading]);

  useEffect(() => {
    if (route.params?.loading == undefined || route.params?.loading == true) {
      var url;
      if (
        route.params?.fromCurrency == undefined &&
        route.params?.toCurrency == undefined
      ) {
        url = "https://currencyexchangerateapi.herokuapp.com/EUR/USD";

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setExchangeRate(data["exchangeRate"]);
            setDate(data["date"]);
          })
          .then(() => setLoading(false));
      } else {
        route.params?.fromCurrency != undefined
          ? (() => {
              setFromCurrency(route.params?.fromCurrency);

              url = `https://currencyexchangerateapi.herokuapp.com/${route.params?.fromCurrency}/${toCurrency}`;
              fetch(url)
                .then((response) => response.json())
                .then((data) => {
                  setExchangeRate(data["exchangeRate"]);
                  setDate(data["date"]);

                  setToCurrencyValue(
                    formatExchangeRate(fromCurrencyValue * data["exchangeRate"])
                  );
                })
                .then(() => setLoading(false));
            })()
          : null;
        route.params?.toCurrency != undefined
          ? (() => {
              setToCurrency(route.params?.toCurrency);

              url = `https://currencyexchangerateapi.herokuapp.com/${fromCurrency}/${route.params?.toCurrency}`;
              fetch(url)
                .then((response) => response.json())
                .then((data) => {
                  setExchangeRate(data["exchangeRate"]);
                  setDate(data["date"]);

                  setToCurrencyValue(
                    formatExchangeRate(fromCurrencyValue * data["exchangeRate"])
                  );
                })
                .then(() => setLoading(false));
            })()
          : null;
      }
    }
  }, [
    route.params?.fromCurrency,
    route.params?.toCurrency,
    route.params?.loading,
  ]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardShown(true);
        setKeyboardHeight(event["endCoordinates"]["height"]);
      }
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardShown, keyboardHeight]);

  const swapCurrencies = () => {
    setLoading(true);

    var fromCurrency_ = toCurrency;
    var toCurrency_ = fromCurrency;

    var fromInputCurrenciesType_ = toInputCurrenciesType;
    var toInputCurrenciesType_ = fromInputCurrenciesType;

    setFromInputCurrenciesType(fromInputCurrenciesType_);
    setToInputCurrenciesType(toInputCurrenciesType_);

    var url = `https://currencyexchangerateapi.herokuapp.com/${fromCurrency_}/${toCurrency_}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRate(data["exchangeRate"]);
        setDate(data["date"]);

        setToCurrencyValue(
          formatExchangeRate(fromCurrencyValue * data["exchangeRate"])
        );
      })
      .then(() => {
        setFromCurrency(fromCurrency_);
        setToCurrency(toCurrency_);
      })
      .then(() => setLoading(false));
  };

  const formatExchangeRate = (exchangeRate) => {
    if (
      (typeof exchangeRate == "number" || typeof exchangeRate == "string") &&
      exchangeRate != undefined &&
      exchangeRate != "0"
    ) {
      exchangeRate = exchangeRate.toString();

      var decimals = exchangeRate.split("");
      decimals = decimals.slice(decimals.indexOf(".") + 1);

      var zeroCount = 0;
      for (var i in decimals) {
        if (decimals[i] === "0") {
          zeroCount += 1;
        }
      }

      var formattedExchangeRate;
      if (exchangeRate.includes(".") == true) {
        zeroCount != 0
          ? zeroCount === 1
            ? (formattedExchangeRate = Number(exchangeRate).toFixed(
                zeroCount + 2
              ))
            : (formattedExchangeRate = Number(exchangeRate).toFixed(
                zeroCount + 1
              ))
          : (formattedExchangeRate = Number(exchangeRate).toFixed(2));
        return formattedExchangeRate;
      } else {
        return exchangeRate;
      }
    }
  };

  //
  setStatusBarStyle("light");
  setBackgroundColorAsync(colors.black);
  setButtonStyleAsync("light");
  //
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          source={require("../assets/background.jpg")}
          style={styles.backgroundImage}
        />
        <View style={styles.header}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <View
            style={{
              padding: "2%",
              borderRadius: 60,
              backgroundColor: `${colors.darkBlue}99`,
            }}
          >
            <Text
              style={{
                fontSize: 0.07 * windowWidth,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              Currency Converter
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={[`${colors.darkBlue}99`, colors.black]}
          style={styles.bottom}
        >
          <View
            style={
              !keyboardShown
                ? styles.inputContainer
                : keyboardHeight
                ? [
                    styles.inputContainer,
                    { marginTop: (8 / 100) * keyboardHeight },
                  ]
                : styles.inputContainer
            }
          >
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.swap}
              onPress={() => swapCurrencies()}
            >
              <Entypo
                name="swap"
                color={colors.white}
                size={0.08 * windowWidth}
              />
            </TouchableOpacity>
            <Input
              currency={fromCurrency}
              value={fromCurrencyValue}
              editable={true}
              onPress={() =>
                navigation.navigate("CurrencyList", {
                  currenciesType: fromInputCurrenciesType,
                  currentCurrency: fromCurrency,
                  oppositeCurrency: toCurrency,
                  fromCurrency: true,
                })
              }
              onChangeText={(input) => {
                setFromCurrencyValue(input);
                setToCurrencyValue(formatExchangeRate(input * exchangeRate));
              }}
            />
            <Input
              currency={toCurrency}
              value={toCurrencyValue}
              editable={false}
              onPress={() =>
                navigation.navigate("CurrencyList", {
                  currenciesType: toInputCurrenciesType,
                  currentCurrency: toCurrency,
                  oppositeCurrency: fromCurrency,
                })
              }
            />
          </View>
          <View
            style={{
              top: "30%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></View>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} allowFontScaling={true} style={styles.text}>
              1 {fromCurrency} = {formatExchangeRate(exchangeRate)} {toCurrency}{" "}
            </Text>
            <Text numberOfLines={1} allowFontScaling={true} style={styles.text}>
              as of
            </Text>
            <Text numberOfLines={1} allowFontScaling={true} style={styles.text}>
              {date}
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.darkView} />
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size={0.2 * windowWidth} color={colors.white} />
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    width: 1 * windowWidth,
    height: 1 * windowHeight + StatusBar.currentHeight * 1.2,
    opacity: 0.6,
    zIndex: -1,
  },
  logo: { height: 0.55 * windowWidth, width: 0.55 * windowWidth },
  header: {
    height: "40%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    height: "60%",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  inputContainer: {
    marginTop: "28%",
    height: "30%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    marginTop: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 0.04 * windowWidth,
    padding: "1%",
  },
  swap: {
    position: "absolute",
    top: "39%",
    left: "8%",
    transform: [{ rotate: "90deg" }],
  },
  loading: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: `${colors.black}99`,
  },
});
