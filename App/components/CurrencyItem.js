import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../constants/colors";

import flags from "../constants/flags";
import crypto_icons from "../constants/crypto_icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default CurrencyItem = ({
  currency,
  currenciesType,
  checked,
  disabled,
  onPress,
}) => {
  return (
    <View>
      {disabled ? <View style={styles.disabledItem} /> : null}
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.5}
        disabled={disabled || checked ? true : false}
        onPress={onPress}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: "bold",
            fontSize: 0.05 * windowWidth,
          }}
        >
          {currency}
        </Text>
        <Image
          source={
            currenciesType == "currencies"
              ? flags[currency]
              : crypto_icons[currency]
          }
          style={
            currenciesType == "currencies" ? styles.flag : styles.crypto_icon
          }
        />
        {checked ? (
          <View style={styles.check}>
            <Entypo name={"check"} color={colors.black} size={30} />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: "5%",
    paddingVertical: "8%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.white,
  },
  flag: {
    position: "absolute",
    left: "25%",
    height: 0.04 * windowHeight,
    width: 0.14 * windowWidth,
    borderRadius: 10,
  },
  crypto_icon: {
    position: "absolute",
    left: "25%",
    height: 0.05 * windowHeight,
    width: 0.1 * windowWidth,
  },
  check: {
    position: "absolute",
    right: "10%",
    backgroundColor: colors.white,
    borderRadius: 100,
    padding: "0.5%",
  },
  disabledItem: {
    position: "absolute",
    backgroundColor: `${colors.black}99`,
    height: "100%",
    width: "100%",
    zIndex: 2,
  },
});
