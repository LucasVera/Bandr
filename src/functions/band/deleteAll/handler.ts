import 'source-map-support/register';

import { handleCatch, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/middlewares';

import schema from './schema';
import verifyJwt, { sendUnauthorizedJsonResponse } from '@common/validation/verifyToken';
import { getBandsCollection } from '@common/db/collections';
import { ErrorDeleting } from '@common/db/constants';

const deleteAllBands: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { data: verifyTokenData } = await verifyJwt(event.headers);
    const { userId } = event.headers;
    if (!verifyTokenData || !verifyTokenData.success) {
      sendUnauthorizedJsonResponse(verifyTokenData);
    }

    const { client, Bands } = await getBandsCollection();
    const operationResult = await Bands.deleteMany({
      createdBy: userId,
      public: false
    });
    if (client.isConnected()) {
      //client.close();
    }

    if (!operationResult) {
      return formatJSONResponse({
        body: {
          success: true,
          error: ErrorDeleting,
        },
        statusCode: 500,
      });
    }

    const { deletedCount } = operationResult;

    return formatJSONResponse({
      body: {
        success: true,
        data: {
          deletedCount,
        }
      }
    });
  }
  catch (ex) {
    return handleCatch(ex);
  }
};

export const main = middyfy(deleteAllBands);
