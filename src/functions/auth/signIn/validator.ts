import { InputSignInData } from "./schema";
import Validation from '@common/validation/ValidationInterface';
import validatePassword from "@common/validation/validatePassword";


export const validateSignInInput = (input: InputSignInData): Validation[] => {
  const { password } = input;
  const validations: Validation[] = [];
  const passwordValidation = validatePassword(password);
  if (passwordValidation && passwordValidation.message) {
    validations.push(passwordValidation);
  }

  // in case more validations are needed, push them in the array so they can be
  // handled by the controller.

  return validations;
};
