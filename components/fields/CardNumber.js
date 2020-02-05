import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image
} from "react-native";
import { determineCardType, getFormattedNumber } from "../utils/formatter";
import { isValidCard } from "../utils/validator";
import { DEFAULT_CARD_NUMBER_PLACEHOLDER } from "../utils/constants";

export default class CardNumber extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      icon: undefined,
      alt: "",
      valid: false
    };
  }

  renderIcon = () => {
    if (this.props.showIcons !== false) {
      if (!this.state.icon) {
        return (
          <View style={styles.scheme}>
            <Text style={styles.alt}>{this.state.alt}</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.scheme}>
            <Image
              style={[styles.logo, this.props.iconStyle]}
              source={this.state.icon}
            />
          </View>
        );
      }
    }
  };

  formatAndValidate = e => {
    let scheme = determineCardType(e);
    let formated = getFormattedNumber(e, scheme);
    let valid = isValidCard(e, scheme);
    this.setState({ value: formated, valid });
    this.setIcon(scheme);
    if (this.props.onChangeText) {
      this.props.onChangeText(getFormattedNumber(e, scheme));
    }
    if (scheme && this.props.onSchemeDetected) {
      this.props.onSchemeDetected({
        type: scheme.cvcLengths,
        cvcLengths: scheme.cvcLengths
      });
    }
    // Only trigger for when the validation is changed
    if (valid !== this.state.valid && this.props.onValidationChange) {
      this.props.onValidationChange(valid);
    }
  };

  setIcon = pm => {
    if (pm === undefined) {
      this.setState({ icon: undefined });
      this.setState({ alt: "" });
      return;
    } else if (this.props.icons && this.props.icons[pm.type]) {
      this.setState({ icon: this.props.icons[pm.type] });
    } else {
      // Default to text when the icon is not provided
      this.setState({ alt: pm.type });
    }
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            // inherit the height from the input
            height:
              this.props.style && this.props.style.height
                ? this.props.style.height
                : 30
          }
        ]}
      >
        <TextInput
          value={this.state.value}
          {...this.props}
          placeholder={
            this.props.placeholder || DEFAULT_CARD_NUMBER_PLACEHOLDER
          }
          onChangeText={this.formatAndValidate}
          style={[styles.input, this.props.style]}
          autoCompleteType="cc-number"
          keyboardType="number-pad"
          returnKeyType="done"
        ></TextInput>
        {this.renderIcon()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 30
  },
  input: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    minHeight: 30,
    paddingLeft: 10,
    paddingRight: 60,
    borderWidth: 1,
    borderColor: "#rgba(0, 0, 0, 0.1)"
  },
  scheme: {
    top: 5,
    bottom: 5,
    right: 10,
    width: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    alignItems: "center"
  },
  alt: {
    textAlign: "center"
  }
});
