import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image
} from "react-native";

export default class CardInput extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.label}>{this.props.labelText}</Text>
        <View
          style={[
            styles.inputContainer,
            { borderColor: this.props.valid ? "transparent" : "#c44040" }
          ]}
        >
          <TextInput
            placeholder={this.props.placeholder || "•••• •••• •••• ••••"}
            placeholderTextColor="#878787"
            onFocus={this.props.cardFocus}
            onBlur={this.props.cardBlur}
            onChangeText={this.props.cardChange}
            style={styles.input}
            value={this.props.value}
            editable
            autoCompleteType="cc-number"
            autoCorrect={false}
            autoFocus={false}
            keyboardAppearance="dark"
            keyboardType="number-pad"
          ></TextInput>
          <Image style={styles.logo} source={this.props.schemeIcon} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10
  },
  label: {
    color: "#fff",
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16
  },
  inputContainer: {
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    borderWidth: 1
  },
  input: {
    flex: 1,
    height: 50,
    padding: 10,
    fontSize: 18,
    color: "#fff"
  },
  logo: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    alignItems: "center",
    padding: 20,
    marginRight: 15
  }
});
