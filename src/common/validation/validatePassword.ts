import { PasswordValidationMessage } from "./constants";
import Validation from "./ValidationInterface";

export default (password: string): Validation => {
  // Checks for at least:
  // - one lower case letter
  // - one upper case letter
  // - one special char (!@#?])
  // - at least 10 characters
  // Original taken from https://techearl.com/regular-expressions/regex-password-strength-validation
  // Can be tested out here: https://regexr.com/
  const passwordRegex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[!@#?\]])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{10,}$/;

  if (!passwordRegex.test(password)) {
    return { message: PasswordValidationMessage };
  }

  return null;
};
