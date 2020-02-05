export const isValidCard = (number, type) => {
  number = number.replace(/\D/g, "");
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
      outcome = isValidCardLength(number, type);
    }
  } else {
    outcome = isValidCardLength(number, type);
  }
  return outcome;
};

export const isValidCardLength = (number, type) => {
  if (type.length.includes(number.trim().length)) {
    return true;
  } else {
    return false;
  }
};

export const isValidDate = (month, year) => {
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
