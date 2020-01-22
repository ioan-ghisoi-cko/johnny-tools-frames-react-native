import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image
} from "react-native";

export default class CvvInput extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.label}>{this.props.labelText}</Text>
        <TextInput
          placeholder={this.props.placeholder || "MM/DD"}
          placeholderTextColor="#878787"
          onFocus={this.props.cvvFocus}
          onBlur={this.props.cvvBlur}
          onChangeText={this.props.cvvChange}
          style={[
            styles.input,
            { borderColor: this.props.valid ? "transparent" : "#c44040" }
          ]}
          value={this.props.value}
          editable
          autoCompleteType="cc-csc"
          autoCorrect={false}
          autoFocus={false}
          keyboardAppearance="dark"
          keyboardType="number-pad"
          maxLength={this.props.length || 5}
        ></TextInput>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  label: {
    color: "#fff",
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16
  },
  input: {
    height: 50,
    padding: 10,
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#1C1C1E",
    borderRadius: 3,
    borderWidth: 1
  }
});
