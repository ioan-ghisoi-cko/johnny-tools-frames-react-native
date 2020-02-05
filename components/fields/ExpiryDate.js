import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image
} from "react-native";
import { getFormattedDate } from "../utils/formatter";
import { isValidDate } from "../utils/validator";
import {
  EXPIRY_DATE_DELIMETER,
  DEFAULT_CARD_EXPIRY_DATE_PLACEHOLDER
} from "../utils/constants";

export default class ExpiryDate extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      valid: false
    };
  }

  formatAndValidate = e => {
    let formatted = getFormattedDate(e);
    let valid = isValidDate(
      formatted.split(EXPIRY_DATE_DELIMETER)[0],
      e.split(EXPIRY_DATE_DELIMETER)[1]
    );
    this.setState({ value: formatted, valid });
    if (this.props.onChangeText) {
      this.props.onChangeText(formatted);
    }
    // Only trigger for when the validation is changed
    if (valid !== this.state.valid && this.props.onValidationChange) {
      this.props.onValidationChange(valid);
    }
  };

  render() {
    return (
      <TextInput
        value={this.state.value}
        {...this.props}
        placeholder={
          this.props.placeholder || DEFAULT_CARD_EXPIRY_DATE_PLACEHOLDER
        }
        onChangeText={this.formatAndValidate}
        style={[styles.input, this.props.style]}
        autoCompleteType="cc-exp"
        keyboardType="number-pad"
        maxLength={5}
        returnKeyType="done"
      ></TextInput>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    minHeight: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#rgba(0, 0, 0, 0.1)"
  }
});
