import 'source-map-support/register';

import { handleCatch, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/middlewares';

import schema from './schema';

import { Band, inputToBandMapper } from '../BandModel';
import { getBandsCollection } from '@common/db/collections'
import { ErrorAddingLike } from '@common/db/constants';
import { ObjectId } from 'bson';

// Alternative: AWS DynamoDB managed db

const likeBand: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const input: Band = inputToBandMapper(event.body);
    const { userId } = event.headers;

    const { Bands } = await getBandsCollection();
    const band = await Bands.findOneAndUpdate({ _id: new ObjectId(input.id) },
    {
      $addToSet: { likedBy: userId }
    },
    {
      returnDocument: 'after'
    });
    
    // client.close();

    if (!band) {
      return formatJSONResponse({
        body: {
          success: false,
          error: ErrorAddingLike,
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

export const main = middyfy(likeBand, {
  verifyAuth: true,
  verifyDbIdLength: true,
  parseBand: true,
  verifyPublic: true,
  findBand: true,
  verifyBandExists: true,
}, {
  dbIdFieldNames: ['id'],
});
