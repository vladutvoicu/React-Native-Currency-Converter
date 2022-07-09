import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../constants/colors";

const windowWidth = Dimensions.get("window").width;

export default Input = ({
  editable,
  currency,
  value,
  onPress,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={[0, 1]}
        end={[0.4, 0]}
        colors={[colors.blue, colors.darkBlue]}
        style={styles.linearGradient}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
            style={styles.currencyPicker}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{
                color: colors.white,
                fontWeight: "bold",
                fontSize: 0.04 * windowWidth,
              }}
            >
              {currency}
            </Text>
          </TouchableOpacity>
          <View style={styles.textInputContainer}>
            <TextInput
              editable={editable}
              value={value}
              placeholder="0.00"
              multiline={false}
              keyboardType={"numeric"}
              contextMenuHidden={true}
              placeholderTextColor={colors.white}
              selectionColor={colors.red}
              style={styles.textInput}
              onChangeText={(input) => onChangeText(input)}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "35%",
    borderRadius: 60,
  },
  linearGradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
  },
  inputContainer: {
    height: "90%",
    width: "98.5%",
    borderRadius: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  currencyPicker: {
    backgroundColor: colors.black,
    height: "100%",
    width: "15%",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderRightWidth: 4,
    borderColor: `${colors.black}00`,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    width: "85%",
    height: "100%",
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: colors.black,
    justifyContent: "center",
  },
  textInput: {
    color: colors.white,
    height: "100%",
    marginLeft: "5%",
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    fontSize: 0.045 * windowWidth,
  },
});
