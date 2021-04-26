❗️BETA

# Frames React Native

[![codecov](https://codecov.io/gh/ioan-ghisoi-cko/johnny-tools-frames-react-native/branch/master/graph/badge.svg?token=KYGJUF3OM8)](https://codecov.io/gh/ioan-ghisoi-cko/johnny-tools-frames-react-native)
[![Test and Deploy](https://github.com/ioan-ghisoi-cko/johnny-tools-frames-react-native/actions/workflows/cd.yml/badge.svg)](https://github.com/ioan-ghisoi-cko/johnny-tools-frames-react-native/actions/workflows/cd.yml)

<p align="center">
	<img src="https://s3.gifyu.com/images/Untitled62eae8e0234fa129.gif" alt="Demo frames react native"/>
</p>

# :rocket: Install

```bash
yarn add johnny-tools-frames-react-native
```

# :computer: Import

```js
import {
  Frames,
  CardNumber,
  ExpiryDate,
  Cvv,
  SubmitButton,
} from "johnny-tools-frames-react-native";
```

# :tada: Example

```js
import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import {
  Frames,
  CardNumber,
  ExpiryDate,
  Cvv,
  SubmitButton,
} from "johnny-tools-frames-react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Frames
        config={{
          debug: true,
          publicKey: "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a",
        }}
        cardTokenized={(e) => {
          alert(e.token);
        }}
      >
        <CardNumber style={styles.cardNumber} placeholderTextColor="#9898A0" />

        <View style={styles.dateAndCode}>
          <ExpiryDate
            style={styles.expiryDate}
            placeholderTextColor="#9898A0"
          />
          <Cvv style={styles.cvv} placeholderTextColor="#9898A0" />
        </View>

        <TouchableHighlight style={styles.button}>
          <SubmitButton
            title="Pay Now"
            onPress={() => console.log("merchant action")}
            color="#fff"
          />
        </TouchableHighlight>
      </Frames>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000001",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateAndCode: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumber: {
    fontSize: 18,
    height: 50,
    color: "#FEFFFF",
    backgroundColor: "#1B1C1E",
    borderColor: "#3A4452",
    borderRadius: 5,
    borderWidth: 0,
  },
  expiryDate: {
    fontSize: 18,
    height: 50,
    width: "48%",
    color: "#FEFFFF",
    backgroundColor: "#1B1C1E",
    borderWidth: 0,
  },
  cvv: {
    fontSize: 18,
    height: 50,
    width: "48%",
    color: "#FEFFFF",
    backgroundColor: "#1B1C1E",
    borderWidth: 0,
  },
  button: {
    height: 50,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#0E84FF",
    marginTop: 20,
    justifyContent: "center",
  },
});
```

## Trigger tokenisation

The tokenisation is triggerd when the SubmitButton is pressed. The action is async, so the outcome of the tokenisation will be shared in the _cardTokenized_ or _cardTokenizationFailed_ handlers.

## The `props` for the Frames wrapper component

| prop              | type    | desciption                                    |
| ----------------- | ------- | --------------------------------------------- |
| config.publicKey  | string  | The public key from your Checkout.com account |
| config.debug      | boolean | Trigger the debugg mode ()                    |
| config.cardholder | object  | The cardholder name and billing details       |

## The `cardholder` information

| prop                                   | type   | desciption                       |
| -------------------------------------- | ------ | -------------------------------- |
| cardholder.name                        | string | The name of the cardholder       |
| cardholder.phone                       | string | The phone number of the customer |
| cardholder.billingAddress              | object | The cardholder billing address   |
| cardholder.billingAddress.addressLine1 | string | Address line 1                   |
| cardholder.billingAddress.addressLine2 | string | Address line 2                   |
| cardholder.billingAddress.zip          | string | Zip                              |
| cardholder.billingAddress.city         | string | City                             |
| cardholder.billingAddress.state        | string | State                            |
| cardholder.billingAddress.country      | string | Country                          |

## The `hanlders`

| prop                   | type     | desciption                                                                                               |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| frameValidationChanged | function | Triggered when a field's validation status has changed. Use it to show error messages or update the UI.  |
| paymentMethodChanged   | function | Triggered when a valid payment method is detected based on the card number being entered.                |
| cardValidationChanged  | function | Triggered when the state of the card validation changes.                                                 |
| cardTokenized          | function | Triggered after a card is tokenized. Here you will get the card token alongside general card information |
| cardTokenizationFailed | function | Triggered after the card tokenization fails.                                                             |
