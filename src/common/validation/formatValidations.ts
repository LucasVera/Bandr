import Validation from "./ValidationInterface";

/**
 * Helper function to format validations to send to the user.
 * @param validations (ValidationInterface) - Validations to format
 * @returns A string message with condensed validation messages
 */
export default function(validations: Validation[]): string {
  return validations.reduce((acum, curr) => ` ${acum} ${curr.message}.`, 'Error:');
}
