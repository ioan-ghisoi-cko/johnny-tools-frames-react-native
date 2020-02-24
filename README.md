❗️EXPERIMENTAL

<p align="center">
	<img src="https://media.giphy.com/media/L0CHkoZlKjp9qjXgoV/giphy.gif" width="320" alt="Demo frames ios"/>
</p>

# Import

```js
import { CardNumber, ExpiryDate, Cvv, Tokenizer } "johnny-tools-react-native";
```

# Initialise the Tokeniser

```js
import ...

const tokeniser = new Tokenizer("pk_test_XXX");

export default function App() {
  ...
}
```

# Define Your Card Scheme Logos

```js
import ...

const schemes = {
  visa: require("./assets/visa.png"),
  mastercard: require("./assets/mastercard.png"),
  amex: require("./assets/amex.png"),
  dinersclub: require("./assets/dinersclub.png"),
  discover: require("./assets/discover.png"),
  jcb: require("./assets/jcb.png")
};

export default function App() {
  ...
}
```

#### Component: `CardNumber`

```js
<CardNumber
  value={(value)=>{}}
  placeholder="•••• •••• •••• ••••"
  icons={schemes} // the scheme logs defined; defaults to text
  onChangeText={(value)=>{})}
  onSchemeDetected={(scheme)=>{}}  // gives you details about the scheme iincluding the valid cvv lengths
  onValidationChange={(value)=>{}}
  style={{
    height: 50,
    ... // other native style pops
  }}
  iconStyle={{
    height: "60%",
    ...  // other native style pops
  }}
/>
```

#### Component: `ExpiryDate`

```js
<CardNumber
  value={(value)=>{}}
  placeholder="MM/YY"
  onChangeText={(value)=>{})}
  onValidationChange={(value)=>{}}
  style={{
    height: 50,
    ... // other native style pops
  }}
/>
```

#### Component: `Cvv`

```js
<CardNumber
  value={(value)=>{}}
  validLengths={cvvLengths} // array of valid cvv lengths
  placeholder="•••"
  onChangeText={(value)=>{})}
  onValidationChange={(value)=>{}}
  style={{
    height: 50,
    ... // other native style pops
  }}
/>
```

#### Component: `Tokeniser`

After collecting the card data, here is how you tokenise it.

> Please make sure you sanetise the values. (no spaces in the card number, correct format for month and year)

```js
const tokeniser = new Tokenizer("pk_test_XXX");
...
const tokenise = async () => {
  // extract the month and year from the formatted version
  const [expiry_month, expiry_year] = inputValues.expiryDate.split("/");
  // remove all non-numeric characters
  const cardNumber = inputValues.number.replace(/\D/g, "");

  const response = await tokeniser.tokenize({
    number: cardNumber,
    cvv: inputValues.cvv,
    expiry_month: expiry_month,
    // add 20 since the API requires a the full year
    expiry_year: "20" + expiry_year
  });
  alert(response.token);
};
```
