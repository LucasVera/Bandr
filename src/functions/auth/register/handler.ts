import 'source-map-support/register';

import { handleCatch, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/middlewares';

import schema, { InputRegisterData } from './schema';
import { getAdminInstance } from '@common/firebase/firebaseInit';
import { validateRegisterInput } from './validator';

import formatValidations from '@common/validation/formatValidations';

const register: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const input: InputRegisterData = event.body;
    const validations = validateRegisterInput(input);
    if (validations && validations.length > 0) {
      // Validation error. Format them and return a 400
      const validationMessage = formatValidations(validations);
      console.log(validationMessage);
      return formatJSONResponse({
        body: {
          success: false,
          error: validationMessage
        }, statusCode: 400
      });
    }

    const firebaseAdmin = getAdminInstance();
    const userCreated = await firebaseAdmin.auth().createUser({
      ...input, displayName: input.name
    });

    return formatJSONResponse({
      body: {
        success: true,
        data: {
          email: userCreated.email
        }
      }
    });
  }
  catch (ex) {
    return handleCatch(ex);
  }
};

export const main = middyfy(register);
