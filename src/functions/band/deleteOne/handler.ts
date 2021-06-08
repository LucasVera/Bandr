import 'source-map-support/register';

import { handleCatch, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/middlewares';

import schema, { InputDeleteBandData } from './schema';
import { getBandsCollection } from '@common/db/collections';
import { ErrorDeleting } from '@common/db/constants';
import { ObjectId } from 'bson';
import { validateDeleteData } from './validator';
import formatValidations from '@common/validation/formatValidations';

const deleteOneBand: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const input: InputDeleteBandData = event.body;
    const { userId } = event.headers;

    const { client, Bands } = await getBandsCollection();
    const validations = await validateDeleteData(input, userId, Bands);
    if (validations.length > 0) {
      return formatJSONResponse({
        body: {
          success: false,
          error: formatValidations(validations),
        },
        statusCode: 400,
      });
    }

    const operationResult = await Bands.deleteOne({ _id: new ObjectId(input.id) });
    if (client.isConnected()) {
      // client.close();
    }
    if (!operationResult) {
      return formatJSONResponse({
        body: {
          success: true,
          error: ErrorDeleting
        },
        statusCode: 500
      });
    }
    const { result } = operationResult;

    return formatJSONResponse({
      body: {
        success: true,
        data: {
          result,
        }
      }
    });
  }
  catch (ex) {
    console.log('error in handler')
    return handleCatch(ex);
  }
};

export const main = middyfy(deleteOneBand, {
  verifyAuth: true,
  verifyDbIdLength: true,
  parseBand: true,
  verifyPrivate: true,
  findBand: true,
  verifyBandExists: true,
}, {
  dbIdFieldNames: ['id']
});
