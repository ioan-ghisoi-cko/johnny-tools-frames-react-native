export const CARD_NUMBER_DELIMETER = " ";
export const EXPIRY_DATE_DELIMETER = "/";
export const DEFAULT_CARD_NUMBER_PLACEHOLDER = "•••• •••• •••• ••••";
export const DEFAULT_CARD_EXPIRY_DATE_PLACEHOLDER = "MM/YY";
export const DEFAULT_CVV_PLACEHOLDER = "•••";
export const DEFAULT_CARD_INDENTATION = /(\d{4})/g;

export const SANDBOX_BASE_URL = "https://api.sandbox.checkout.com";
export const LIVE_BASE_URL = "https://api.checkout.com";
export const SANDBOX_PUBLIC_KEY_REGEX = /^pk_?(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})$/;
export const LIVE_PUBLIC_KEY_REGEX = /^pk_?(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})$/;

export const AMEX_CARD_INDENTATION = /^(\d{4,10})/;
export const SCHEMES = [
  {
    type: "maestro",
    pattern: /^(50[0-9]{4}|5018|5020|5038|5[6-9][0-9]{4}|6[0-9]{5}|6304|6759|6759[0-9]{2}|676[1-3]|676777[0-4])/,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLengths: [3],
    luhn: true
  },
  {
    type: "dinersclub",
    pattern: /^(36|38|30[0-5])/,
    length: [14],
    cvcLengths: [3],
    luhn: true
  },
  {
    type: "laser",
    pattern: /^(6706|6771|6709)/,
    length: [16, 17, 18, 19],
    cvcLengths: [3],
    luhn: true
  },
  {
    type: "jcb",
    pattern: /^35/,
    length: [16],
    cvcLengths: [3],
    luhn: true
  },
  {
    type: "unionpay",
    pattern: /^62/,
    length: [16, 17, 18, 19],
    cvcLengths: [3],
    luhn: false
  },
  {
    type: "discover",
    pattern: /^(6011|65|64[4-9]|622)/,
    length: [16],
    cvcLengths: [3],
    luhn: true
  },
  {
    type: "mastercard",
    pattern: /^(5[1-5]|2[221-720])/,
    length: [16],
    cvcLengths: [3],
    luhn: true
  },
  {
    type: "amex",
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLengths: [3, 4],
    luhn: true
  },
  {
    type: "visa",
    pattern: /^4/,
    length: [13, 14, 15, 16, 19],
    cvcLengths: [3],
    luhn: true
  }
];
