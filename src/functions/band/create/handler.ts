import 'source-map-support/register';

import { handleCatch, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/middlewares';

import schema from './schema';

import { Band, inputToBandMapper } from '../BandModel';
import { getBandsCollection } from '@common/db/collections';

// Alternative: AWS DynamoDB managed db

const createBand: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const input: Band = inputToBandMapper(event.body);
    input.createdBy = event.headers.userId;

    const { Bands, client } = await getBandsCollection();
    const band = await Bands.insertOne(input);
    if (client.isConnected()) {
      //client.close();
    }

    console.log('band', band.ops[0]);

    return formatJSONResponse({
      body: {
        success: true,
        data: {
          band: band.ops[0]
        },
      },
    });
  }
  catch (ex) {
    return handleCatch(ex);
  }
};

export const main = middyfy(createBand, {
  verifyAuth: true
});
