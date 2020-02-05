import React, { useState } from "react";
import { CardNumber, ExpiryDate, Cvv, Tokenizer } from "./components";

import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";

const tokeniser = new Tokenizer("pk_test_6e40a700-d563-43cd-89d0-f9bb17d35e73");

const schemes = {
  visa: require("./assets/visa.png"),
  mastercard: require("./assets/mastercard.png"),
  amex: require("./assets/amex.png"),
  dinersclub: require("./assets/dinersclub.png"),
  discover: require("./assets/discover.png"),
  jcb: require("./assets/jcb.png")
};

export default function App() {
  const [cvvLengths, setCvvLengths] = useState(undefined);
  const [currentScheme, setCurrentScheme] = useState(undefined);

  const [validation, setValidation] = useState({
    number: false,
    expiryDate: false,
    cvv: false
  });

  const [inputValues, setInputValue] = useState({
    number: "",
    expiryDate: "",
    cvv: ""
  });

  const onCardCahnge = e => {
    setInputValue({ ...inputValues, number: e });
  };

  const onDateCahnge = e => {
    setInputValue({ ...inputValues, expiryDate: e });
  };

  const onCvvCahnge = e => {
    setInputValue({ ...inputValues, cvv: e });
  };

  const tokenise = async () => {
    // extract the month and year from teh formatted version
    const [expiry_month, expiry_year] = inputValues.expiryDate.split("/");
    // remove all non numeric characters
    const cardNumber = inputValues.number.replace(/\D/g, "");

    const response = await tokeniser.tokenize({
      number: cardNumber,
      cvv: inputValues.cvv,
      expiry_month: expiry_month,
      // add 20 since the API requires a the full year
      expiry_year: "20" + expiry_year
    });
    console.log(response);
    alert(response.token);
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <CardNumber
          placeholder="•••• •••• •••• ••••"
          style={{
            height: 50,
            borderColor: "#rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
            fontSize: 18
          }}
          iconStyle={{
            height: "60%"
          }}
          onChangeText={onCardCahnge}
          onSchemeDetected={e => setCvvLengths(e.cvcLengths)}
          icons={schemes}
          value={inputValues.number}
          onValidationChange={e => {
            console.log(e);
          }}
        />

        <View style={styles.dateAndCvv}>
          <ExpiryDate
            placeholder="MM/DD"
            style={{
              width: "50%",
              height: 50,
              borderColor: "#rgba(0, 0, 0, 0.1)",
              borderWidth: 1,
              fontSize: 18
            }}
            value={inputValues.expiryDate}
            onChangeText={onDateCahnge}
            onValidationChange={e => {
              console.log(e);
            }}
          />

          <Cvv
            placeholder="•••"
            validLengths={cvvLengths}
            style={{
              width: "50%",
              height: 50,
              borderColor: "#rgba(0, 0, 0, 0.1)",
              borderWidth: 1,
              fontSize: 18
            }}
            value={inputValues.cvv}
            onChangeText={onCvvCahnge}
            onValidationChange={e => {
              console.log(e);
            }}
          />
        </View>
      </View>
      <Button title="Pay £12" onPress={tokenise} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
    // backgroundColor: "#000"
  },
  detailsContainer: {
    height: 200,
    marginBottom: 200,
    marginTop: 300,
    marginLeft: 20,
    marginRight: 20
  },
  cardForm: {
    flex: 1
  },
  dateAndCvv: {
    flexDirection: "row"
  },
  payButton: {
    marginTop: 30,
    height: 50,
    borderColor: "#1C1C1E",
    borderWidth: 2,
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10
  }
});
