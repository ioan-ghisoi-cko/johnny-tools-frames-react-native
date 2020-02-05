import {
  SCHEMES,
  AMEX_CARD_INDENTATION,
  CARD_NUMBER_DELIMETER,
  DEFAULT_CARD_INDENTATION,
  EXPIRY_DATE_DELIMETER
} from "./constants";

export const determineCardType = val => {
  return SCHEMES.find(function(scheme) {
    return scheme.pattern.test(val);
  });
};

export const getFormattedNumber = (number, type) => {
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

export const addInnerSlash = val => {
  var chuncks = val.match(/.{1,2}/g);
  return chuncks.join(EXPIRY_DATE_DELIMETER);
};

export const getFormattedDate = val => {
  const sanetisedValue = val.replace(/[^0-9/]/g, "");

  if (val.length === 1 && val == 0) {
    return val;
  } else if (val.length === 1 && val > 1) {
    return "0" + val + EXPIRY_DATE_DELIMETER;
  } else if (val.length > 1) {
    return addInnerSlash(val.replace(/\D/g, ""));
  } else {
    return val;
  }
};
