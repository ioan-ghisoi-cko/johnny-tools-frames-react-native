❗️EXPERIMENTAL

<p align="center">
	<img src="https://media.giphy.com/media/L0CHkoZlKjp9qjXgoV/giphy.gif" width="320" alt="Demo frames ios"/>
</p>

# Example

```js
import React from "react";
import { StyleSheet, View } from "react-native";
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
        <CardNumber style={styles.cardNumber} />

        <View style={styles.dateAndCode}>
          <ExpiryDate style={styles.expiryDate} />
          <Cvv style={styles.cvv} />
        </View>
        <SubmitButton
          title="Pay Now"
          onPress={() => console.log("mercahnt action")}
        />
      </Frames>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dateAndCode: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumber: {
    height: 50,
  },
  expiryDate: {
    height: 50,
    flex: 1,
  },
  cvv: {
    height: 50,
    flex: 1,
  },
  framesStyle: {
    width: "80%",
  },
});
```
