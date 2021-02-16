import { isValidDate } from "../src/utils/card";
import { getFormattedDate } from "../src/utils/date";
import { getEnvironment } from "../src/utils/http";

const PK_SB = "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a";
const PK_PROD = "pk_4296fd52-efba-4a38-b6ce-cf0d93639d8a"; // fake key

describe("Date", () => {
  it("formats date", async () => {
    let outcome = isValidDate("06/");
    expect(outcome).toBe(false);
  });

  it("adds 0 for date values", async () => {
    let outcome = getFormattedDate("6");
    expect(outcome).toBe("06/");
  });

  it("allows leading 0 for date values", async () => {
    let outcome = getFormattedDate("0");
    expect(outcome).toBe("0");
  });

  it("ignores other date values", async () => {
    let outcome = getFormattedDate("!");
    expect(outcome).toBe("!");
  });
});

describe("Environment", () => {
  it("it gets the live environment", async () => {
    let env = getEnvironment(PK_PROD);
    expect(env).toBe("https://api.checkout.com/tokens");
  });

  it("gets the sb environment", async () => {
    let env = getEnvironment(PK_SB);
    expect(env).toBe("https://api.sandbox.checkout.com/tokens");
  });

  it("rejects invalid key", async () => {
    expect(() => {
      let env = getEnvironment("pk123456789");
    }).toThrow("The key provided is not in the correct format.");
  });
});
