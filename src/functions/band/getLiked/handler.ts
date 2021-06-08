import 'source-map-support/register';

import { handleCatch, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/middlewares';

import schema from './schema';
import { getBandsCollection } from '@common/db/collections';
import { getSkip } from '@common/util';

const {
  PAGINATION_DEFAULT_LIMIT: defaultLimit
} = process.env;

const getBands: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const {
      limit: limitParam,
      page: pageParam
    } = event.pathParameters || {};

    const limit = limitParam ? parseInt(limitParam) : parseInt(defaultLimit);
    const page = pageParam ? parseInt(pageParam) : 1;
    const skip = getSkip(page, limit);

    const { userId } = event.headers
    console.log('before get collection')
    const { client, Bands } = await getBandsCollection();
    console.log('before find')
    
    const whereObj: getBandsInterface = {
      public: true,
      likedBy: userId
    };

    const bands = await Bands.find(whereObj)
      .skip(skip)
      .limit(limit)
      .toArray();
      
    console.log('before checking is connected')
    if (client.isConnected()) {
      // client.close();
    }

    console.log('before returning response', bands)
    return formatJSONResponse({
      body: {
        success: true,
        data: {
          bands,
        }
      }
    });
  }
  catch (ex) {
    console.log('in error handler', ex)
    return handleCatch(ex);
  }
};

export const main = middyfy(getBands, {
  verifyAuth: true,
});

interface getBandsInterface {
  public: boolean,
  likedBy?: string,
}
