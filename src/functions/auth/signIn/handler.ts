import 'source-map-support/register';

import { handleCatch, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/middlewares';

import schema, { InputSignInData } from './schema';
import { getInstance } from '@common/firebase/firebaseInit';
import { validateSignInInput } from './validator';

import formatValidations from '@common/validation/formatValidations';

const signIn: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const input: InputSignInData = event.body;
    const validations = validateSignInInput(input);
    if (validations && validations.length > 0) {
      // Validation error. Format them and return a 400
      const validationMessage = formatValidations(validations);
      console.log(validationMessage)
      return formatJSONResponse({
        body: {
          success: false,
          error: validationMessage
        },
        statusCode: 400,
      });
    }

    const firebase = getInstance();
    const { email, password } = input;
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    const token = await user.getIdToken();

    const {
      uid: id,
      displayName: name,
      photoURL,
      phoneNumber,
    } = user;

    return formatJSONResponse({
      body: {
        success: true,
        data: {
          token,
          user: {
            id,
            name,
            photoURL,
            phoneNumber,
          }
        }
      },
    });
  }
  catch (ex) {
    return handleCatch(ex);
  }
};

export const main = middyfy(signIn);
