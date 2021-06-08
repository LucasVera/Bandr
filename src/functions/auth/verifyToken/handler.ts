import 'source-map-support/register';

import { handleCatch, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/middlewares';

import schema, { InputVerifyTokenData } from './schema';
import { getAdminInstance } from '@common/firebase/firebaseInit';

import { validateTokenData } from './validator';
import formatValidations from '@common/validation/formatValidations';

const verifyToken: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { token, userId }: InputVerifyTokenData = event.body;

    console.log('body', event.body)

    const firebaseAdmin = getAdminInstance();
    const { auth_time, uid } = await firebaseAdmin.auth().verifyIdToken(token);

    const validations = validateTokenData(auth_time * 1000, uid, userId);
    if (validations.length > 0) {
      const validationMessage = formatValidations(validations);
      return formatJSONResponse({
        body: {
          success: false,
          error: validationMessage,
        },
        statusCode: 401,
      });
    }

    return formatJSONResponse({
      body: {
        success: true,
        data: {
          userId,
        },
      }
    });
  }
  catch (ex) {
    return handleCatch(ex);
  }
};

export const main = middyfy(verifyToken);
