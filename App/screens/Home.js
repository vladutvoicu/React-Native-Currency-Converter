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
import currencies_ from "../constants/currencies";

export default Home = ({ navigation, route }) => {
  const [keyboardShown, setKeyboardShown] = useState();
  const [keyboardHeight, setKeyboardHeight] = useState();
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromCurrencyValue, setFromCurrencyValue] = useState("");
  const [toCurrencyValue, setToCurrencyValue] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [date, setDate] = useState("");
  const [currencies, setCurrencies] = useState(currencies_);

  useEffect(() => {
    route.params?.fromCurrency != undefined
      ? setFromCurrency(route.params?.fromCurrency)
      : null;
    route.params?.toCurrency != undefined
      ? setToCurrency(route.params?.toCurrency)
      : null;
  }, [route.params?.fromCurrency, route.params?.toCurrency]);

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
    var _fromCurrency = toCurrency;
    var _toCurrency = fromCurrency;
    setFromCurrency(_fromCurrency);
    setToCurrency(_toCurrency);
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
          <LinearGradient
            colors={[`${colors.darkPink}70`, `${colors.blue}70`]}
            start={[0, 0]}
            end={[1, 0]}
            style={{ padding: "2%", borderRadius: 60 }}
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
          </LinearGradient>
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
                    { marginTop: (35 / 100) * keyboardHeight },
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
                  currencies: currencies,
                  currentCurrency: fromCurrency,
                  oppositeCurrency: toCurrency,
                  fromCurrency: true,
                })
              }
              onChangeText={(input) => {
                setFromCurrencyValue(input);
              }}
            />
            <Input
              currency={toCurrency}
              value={toCurrencyValue}
              editable={false}
              onPress={() =>
                navigation.navigate("CurrencyList", {
                  currencies: currencies,
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
          <View style={styles.text}>
            <Text
              numberOfLines={1}
              allowFontScaling={true}
              style={{ color: colors.white, fontSize: 0.04 * windowWidth }}
            >
              1 {fromCurrency} = {exchangeRate} {toCurrency} as of {date}{" "}
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.darkView} />
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
  text: {
    marginTop: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  swap: {
    position: "absolute",
    top: "39%",
    left: "8%",
    transform: [{ rotate: "90deg" }],
  },
});
