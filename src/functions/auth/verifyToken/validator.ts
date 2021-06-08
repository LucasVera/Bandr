import { ExpiredTokenValidationMessage, JWTUserDoesntMatch } from '@common/validation/constants';
import Validation from '@common/validation/ValidationInterface';
import moment from 'moment';

const defaultJwtTtlMinutes = 20;

export const validateTokenData = (authTime: number, jwtUserId: string, userId: string): Validation[] => {
  const validations: Validation[] = [];
  const { JWT_TTL_MINUTES } = process.env;
  let jwtTtlMinutes = parseInt(JWT_TTL_MINUTES);
  if (!jwtTtlMinutes || isNaN(jwtTtlMinutes)) {
    console.log(`Cannot parse TTL variable properly. Going for default value: ${defaultJwtTtlMinutes}`);
    jwtTtlMinutes = defaultJwtTtlMinutes; // Value by default if cannot read properly
  }

  const diffMinutes = moment().diff(moment(authTime), 'minutes');
  if (diffMinutes > jwtTtlMinutes) {
    validations.push({ message: ExpiredTokenValidationMessage });
  }

  if (userId !== jwtUserId) {
    validations.push({ message: JWTUserDoesntMatch });
  }

  return validations;
};
