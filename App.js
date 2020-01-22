import React, { useState } from "react";
import CardInput from "./components/CardInput/CardInput";
import DateInput from "./components/DateInput/DateInput";
import CvvInput from "./components/CvvInput/CvvInput";

import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";

const schemes = {
  visa: require("./assets/visa.png"),
  mastercard: require("./assets/mastercard.png"),
  amex: require("./assets/amex.png"),
  dinersclub: require("./assets/dinersclub.png"),
  discover: require("./assets/discover.png"),
  jcb: require("./assets/jcb.png")
};

export default function App() {
  const [schemeIcon, setSchemeicon] = useState(undefined);
  const [cvvLength, setCvvLength] = useState(4);
  const [currentScheme, setCurrentScheme] = useState(undefined);

  const [validation, setValidation] = useState({
    cardNumber: false,
    expiryDate: false,
    cvv: false
  });

  const [hideError, setHideError] = useState({
    cardNumber: true,
    expiryDate: true,
    cvv: true
  });

  const [inputValues, setInputValue] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const _onCardChange = e => {
    setHideError({ ...hideError, cardNumber: true });
    const sanetisedValue = e.replace(/[^0-9]/g, "");
    const pm = _determineCardType(e);
    setCurrentScheme(pm);
    let trim = pm !== undefined ? _getFormattedNumber(e, pm.type) : e;
    setInputValue({ ...inputValues, cardNumber: trim });
    setValidation({
      ...validation,
      cardNumber: _isValidCard(sanetisedValue, pm)
    });

    if (!pm) {
      setSchemeicon(undefined);
      setCvvLength(4);
    } else {
      setSchemeicon(schemes[pm.type]);
      setCvvLength(Math.max(pm.cvcLength));
    }
  };

  const _onCardFocus = e => {
    setHideError({ ...hideError, cardNumber: true });
  };

  const _onCardBlur = e => {
    setHideError({ ...hideError, cardNumber: validation.cardNumber });
  };

  const _onDateChange = e => {
    setHideError({ ...hideError, expiryDate: true });
    const sanetisedValue = e.replace(/[^0-9/]/g, "");
    if (e.length === 1 && e == 0) {
      setInputValue({ ...inputValues, expiryDate: e });
    } else if (e.length === 1 && e > 1) {
      setInputValue({ ...inputValues, expiryDate: "0" + e + "/" });
    } else if (e.length > 1) {
      setInputValue({
        ...inputValues,
        expiryDate: _addInnerSlash(e.replace(/\D/g, ""))
      });
    } else {
      setInputValue({ ...inputValues, expiryDate: e });
    }

    setValidation({
      ...validation,
      expiryDate: _isValidDate(e.split("/")[0], e.split("/")[1])
    });
  };

  const _onDateFocus = () => {
    setHideError({ ...hideError, expiryDate: true });
  };

  const _onDateBlur = () => {
    setHideError({ ...hideError, expiryDate: validation.expiryDate });
  };

  const _onCvvChange = e => {
    setInputValue({ ...inputValues, cvv: e.replace(/[^\d]/, "") });

    // set max cvv length
    if (currentScheme && currentScheme.cvcLength) {
      setCvvLength(Math.max(currentScheme.cvcLength));
    }
    setValidation({
      ...validation,
      cvv: _isValidCvv(e, currentScheme)
    });
  };

  const _onCvvFocus = () => {
    setHideError({ ...hideError, cvv: true });
  };

  const _onCvvBlur = () => {
    setHideError({ ...hideError, cvv: validation.cvv });
  };

  const _tokenise = async () => {
    const response = await fetch("https://api.sandbox.checkout.com/tokens", {
      method: "post",
      headers: new Headers({
        Accept: "application/json",
        Origin: "*",
        Authorization: "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        type: "card",
        number: inputValues.cardNumber.replace(/\s/g, ""),
        expiry_month: inputValues.expiryDate.split("/")[0],
        expiry_year: "20" + inputValues.expiryDate.split("/")[1],
        cvv: inputValues.cvv
      })
    });
    const json = await response.json();
    alert(json.token);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardForm}>
        <CardInput
          labelText="Card Number"
          schemeIcon={schemeIcon}
          value={inputValues.cardNumber}
          cardChange={_onCardChange}
          placeholder="•••• •••• •••• ••••"
          valid={hideError.cardNumber}
          cardFocus={_onCardFocus}
          cardBlur={_onCardBlur}
        />
        <View style={styles.dateAndCvv}>
          <DateInput
            labelText="Expiry Date"
            value={inputValues.expiryDate}
            dateChange={_onDateChange}
            placeholder="MM/DD"
            valid={hideError.expiryDate}
            dateFocus={_onDateFocus}
            dateBlur={_onDateBlur}
          />
          <CvvInput
            labelText="Cvv"
            value={inputValues.cvv}
            cvvChange={_onCvvChange}
            placeholder="•••"
            valid={hideError.cvv}
            cvvFocus={_onCvvFocus}
            cvvBlur={_onCvvBlur}
            length={cvvLength}
          />
        </View>

        <View
          style={[
            styles.payButton,
            {
              backgroundColor:
                validation.cardNumber && validation.expiryDate && validation.cvv
                  ? "#fff"
                  : "transparent"
            }
          ]}
        >
          <Button
            color={
              validation.cardNumber && validation.expiryDate && validation.cvv
                ? "#000"
                : "white"
            }
            title="Pay £12"
            onPress={_tokenise}
          >
            Visa
          </Button>
        </View>
      </View>
    </View>
  );
}

const DEFAULT_CARD_INDENTATION = /(\d{4})/g;
const AMEX_CARD_INDENTATION = /^(\d{4,10})/;
const CARD_NUMBER_DELIMETER = " ";
const SCHEMES = [
  {
    type: "maestro",
    pattern: /^(50[0-9]{4}|5018|5020|5038|5[6-9][0-9]{4}|6[0-9]{5}|6304|6759|6759[0-9]{2}|676[1-3]|676777[0-4])/,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "dinersclub",
    pattern: /^(36|38|30[0-5])/,
    length: [14],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "laser",
    pattern: /^(6706|6771|6709)/,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "jcb",
    pattern: /^35/,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "unionpay",
    pattern: /^62/,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false
  },
  {
    type: "discover",
    pattern: /^(6011|65|64[4-9]|622)/,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "mastercard",
    pattern: /^(5[1-5]|2[221-720])/,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "amex",
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [3, 4],
    luhn: true
  },
  {
    type: "visa",
    pattern: /^4/,
    length: [13, 14, 15, 16, 19],
    cvcLength: [3],
    luhn: true
  }
];

const _determineCardType = val => {
  return SCHEMES.find(function(scheme) {
    return scheme.pattern.test(val);
  });
};

const _getFormattedNumber = (number, type) => {
  const value = number.replace(/\D/g, "");

  var newValue = "";
  if (type === "amex") {
    newValue = value.replace(AMEX_CARD_INDENTATION, function(match) {
      // 4 digit match
      if (match.length === 4) {
        return match + CARD_NUMBER_DELIMETER;
      } else {
        // 10 digit match
        return (
          match.substr(0, 4) +
          CARD_NUMBER_DELIMETER +
          match.substr(4, 6) +
          CARD_NUMBER_DELIMETER
        );
      }
    });
  } else {
    newValue = value.replace(DEFAULT_CARD_INDENTATION, function(match) {
      return match + CARD_NUMBER_DELIMETER;
    });
  }
  // trim out any excess space
  return newValue.replace(/(\s)+$/, "");
};

const _isValidCard = (number, type) => {
  let outcome;
  if (number === "") {
    outcome = false;
  } else if (type === undefined) {
    outcome = false;
  } else if (type.luhn) {
    //= ============ Luhn check ====================
    var digits = number.split("");
    for (var i = 0; i < digits.length; i++) {
      digits[i] = parseInt(digits[i], 10);
    }
    // Run the Luhn algorithm on the array
    var sum = 0;
    var alt = false;
    for (i = digits.length - 1; i >= 0; i--) {
      if (alt) {
        digits[i] *= 2;
        if (digits[i] > 9) {
          digits[i] -= 9;
        }
      }
      sum += digits[i];
      alt = !alt;
    }
    // Check the result
    if (sum % 10 === 0) {
      outcome = true;
    } else {
      outcome = false;
    }
    if (outcome) {
      outcome = _isValidCardLength(number, type);
    }
  } else {
    outcome = _isValidCardLength(number, type);
  }
  return outcome;
};

const _isValidCardLength = (number, type) => {
  if (type.length.includes(number.trim().length)) {
    return true;
  } else {
    return false;
  }
};

const _addInnerSlash = val => {
  var chuncks = val.match(/.{1,2}/g);
  return chuncks.join("/");
};

const _isValidCvv = (cvv, pm) => {
  if (!pm || pm.cvcLength === undefined) {
    return false;
  }
  return pm.cvcLength.includes(cvv.replace(/[^\d]/, "").length);
};

const _isValidDate = (month, year) => {
  if (!month || !year) {
    return false;
  }
  let today = new Date();
  let expiry = new Date("20" + year, month);
  let outcome;

  if (today.getTime() >= expiry.getTime()) {
    outcome = false;
  } else {
    outcome = true;
  }
  return outcome;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000"
  },
  cardForm: {
    flex: 1
  },
  dateAndCvv: {
    flexDirection: "row",
    marginTop: 10
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
