import 'source-map-support/register';

import { formatJSONResponse, handleCatch, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/middlewares';

import schema from './schema';
import { getRandomNumberFromApi } from '@common/util';
import { ErrorGettingRandomNumber } from '@common/validation/constants';

const getRandomInt: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    const { data } = await getRandomNumberFromApi();
    if (!data) {
      return formatJSONResponse({
        body: {
          success: false,
          error: ErrorGettingRandomNumber
        },
        statusCode: 500
      });
    }

    return formatJSONResponse({
      body: {
        success: true,
        data: {
          number: data.number
        }
      }
    });
  }
  catch (ex) {
    return handleCatch(ex);
  }
};

export const main = middyfy(getRandomInt);
