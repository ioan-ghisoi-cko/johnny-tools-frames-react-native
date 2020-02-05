import {
  SANDBOX_BASE_URL,
  LIVE_BASE_URL,
  LIVE_PUBLIC_KEY_REGEX
} from "./constants";

export class Tokenizer {
  constructor(publicKey) {
    this.publicKey = publicKey;
    this.endpoint = LIVE_PUBLIC_KEY_REGEX.test(publicKey)
      ? LIVE_BASE_URL
      : SANDBOX_BASE_URL;
  }
  async tokenize(body) {
    try {
      let response = await fetch(`${this.endpoint}/tokens`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.publicKey
        },
        body: JSON.stringify({ ...body, type: "card" })
      });

      if (!response.ok) {
        const json = response.text().then(function(text) {
          return text ? JSON.parse(text) : {};
        });
        throw { status: response.status, json };
      }

      return await response.json();
    } catch (er) {
      throw er;
    }
  }
}

export default Tokenizer;
