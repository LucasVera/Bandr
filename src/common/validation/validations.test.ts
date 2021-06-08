import { PasswordValidationMessage } from "./constants";
import validateDbIdLength from "./validateDbIdLength";
import validatePassword from "./validatePassword";

test('Should validate password contains at least 10 characters, one lowercase, one uppercase and following elements !@#?]', () => {
  const verifyValidationMessage = (password) => {
    const validation = validatePassword(password);
    expect(validation).toHaveProperty('message');
    expect(validation.message).toBe(PasswordValidationMessage);
  };

  let password: string;

  password = '';
  verifyValidationMessage(password);

  password = '123456789';
  verifyValidationMessage(password);

  password = 'password!!!!';
  verifyValidationMessage(password);

  password = 'PASSWORD!!!!';
  verifyValidationMessage(password);

  password = 'Password!!!!';
  const validation = validatePassword(password);
  expect(validation).toBeFalsy();
});

test('Should validate that a db id meets the required length', () => {
  let id: string;
  let validationResult: boolean;

  id = '';
  validationResult = validateDbIdLength(id);
  expect(validationResult).toBe(false);

  id = '12345678901234567890123456789';
  validationResult = validateDbIdLength(id);
  expect(validationResult).toBe(false);
});
