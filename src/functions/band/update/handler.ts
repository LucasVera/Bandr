import 'source-map-support/register';

import { handleCatch, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/middlewares';

import schema from './schema';

import { Band, cleanNullFields, inputToBandMapper } from '../BandModel';
import { getBandsCollection } from '@common/db/collections'
import { ErrorUpdating } from '@common/db/constants';
import { ObjectId } from 'bson';
import { validateUpdateData } from './validator';
import formatValidations from '@common/validation/formatValidations';

// Alternative: AWS DynamoDB managed db

const updateOneBand: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const input: Band = cleanNullFields(inputToBandMapper(event.body));

    const { Bands } = await getBandsCollection();
    const validations = await validateUpdateData(input, event.headers.userId, Bands);
    if (validations.length > 0) {
      return formatJSONResponse({
        body: {
          success: false,
          error: formatValidations(validations)
        },
        statusCode: 400
      });
    }
    const band = await Bands.findOneAndUpdate({ _id: new ObjectId(input.id) },
    {
      $set: input
    },
    {
      returnDocument: 'after'
    });
    
    // client.close();

    if (!band) {
      return formatJSONResponse({
        body: {
          success: false,
          error: ErrorUpdating,
        },
        statusCode: 500,
      });
    }

    return formatJSONResponse({
      body: {
        success: true,
        data: {
          band: band.value
        }
      }
    });
  }
  catch (ex) {
    return handleCatch(ex);
  }
};

export const main = middyfy(updateOneBand, {
  verifyAuth: true,
  verifyDbIdLength: true,
  parseBand: true,
  verifyPrivate: true,
  findBand: true,
  verifyBandExists: true,
}, {
  dbIdFieldNames: ['id'],
});
