import { getBandsCollection } from "@common/db/collections";
import { BandDoesntExist, dbIdComplianceMessage, NotAllowedOnPrivateBands, NotAllowedOnPublicBands, NotAllowedToChangeOtherPeoplesBands } from "@common/db/constants";
import validateDbIdLength from "@common/validation/validateDbIdLength";
import verifyJwt, { sendUnauthorizedJsonResponse } from "@common/validation/verifyToken";
import { Band, inputToBandMapper } from "@functions/band/BandModel";
import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { ObjectId } from "bson";
import { formatJSONResponse, handleCatch } from "./apiGateway";

export const middyfy = (handler, middlewaresToApply: MiddlewaresToApply = {}, config: MiddlewaresConfig = {}): any => {
  // default middlewares on every request
  const middlewares = [middyJsonBodyParser()];

  // Caution: modify with care since middleware order execution is important
  middlewaresToApply.verifyAuth && middlewares.push(verifyAuthMiddleware());
  middlewaresToApply.parseBand && middlewares.push(parseBandModelMiddleware());
  middlewaresToApply.findBand && middlewares.push(findBand());
  middlewaresToApply.verifyBandExists && middlewares.push(verifyBandExists());
  middlewaresToApply.verifyDbIdLength && middlewares.push(verifyDbIdLength(config));
  middlewaresToApply.verifyPublic && middlewares.push(verifyPublic());
  middlewaresToApply.verifyPrivate && middlewares.push(verifyPrivate());

  return middy(handler).use(middlewares);
};

export const parseBandModelMiddleware = () => ({
  before: (handler) => {
    try {
      const parsedBand: Band = inputToBandMapper(handler.event.body);
      handler.event.parsedBand = parsedBand;
    }
    catch (ex) {
      console.log('Error in middleware "parseBandModelMiddleware"');
      return handleCatch(ex);
    }
  },
});

export const verifyAuthMiddleware = () => ({
  before: async (handler) => {
    try {
      const { data: verifyTokenData } = await verifyJwt(handler.event.headers);
      console.log('token is ok');
      if (!verifyTokenData || !verifyTokenData.success) {
        return sendUnauthorizedJsonResponse(verifyTokenData);
      }
    }
    catch (ex) {
      console.log('Error in middleware "verifyAuthMiddleware"');
      return handleCatch(ex);
    }
  },
});

export const verifyDbIdLength = (config: MiddlewaresConfig) => ({
  before: (handler) => {
    try {
      const { dbIdFieldNames } = config;
      for (let i = 0; i < dbIdFieldNames.length; i++) {
        const dbIdFieldName = dbIdFieldNames[i];
        const idField = handler.event.body[dbIdFieldName];
        if (!validateDbIdLength(idField)) {
          return formatJSONResponse({
            body: {
              success: false,
              error: dbIdComplianceMessage(dbIdFieldName),
            },
            statusCode: 400,
          });
        }
      }
    }
    catch (ex) {
      console.log('Error in middleware "verifyDbLength"');
      return handleCatch(ex);
    }
  }
});

export const verifyPrivate = () => ({
  before: (handler) => {
    try {
      const band = handler.event.band;
      const { userId } = handler.event.headers;
      if (band) {
        if (band.createdBy !== userId) {
          return formatJSONResponse({
            body: {
              success: false,
              error: NotAllowedToChangeOtherPeoplesBands
            },
            statusCode: 403
          });
        }

        if (band.public) {
          return formatJSONResponse({
            body: {
              success: false,
              error: NotAllowedOnPublicBands
            },
            statusCode: 403
          });
        }
      }
    }
    catch (ex) {
      console.log('Error in middleware "verifyPrivate"');
      return handleCatch(ex);
    }
  }
});

/**
 * Verify that the operation is performed on a public band.
 */
export const verifyPublic = () => ({
  before: (handler) => {
    try {
      const band = handler.event.band;
      if (band && !band.public) {
        return formatJSONResponse({
          body: {
            success: false,
            error: NotAllowedOnPrivateBands
          }
        });
      }
    }
    catch (ex) {
      console.log('Error in middleware "verifyPublic"');
      return handleCatch(ex);
    }
  }
});

export const findBand = () => ({
  before: async (handler) => {
    try {
      const parsedBand: Band = handler.event.parsedBand;
      const { Bands } = await getBandsCollection();
      const band = await Bands.findOne({ _id: new ObjectId(parsedBand.id) });
      handler.event.band = band;
    }
    catch (ex) {
      console.log('Error in middleware "findBand"');
      return handleCatch(ex);
    }
  }
});

export const verifyBandExists = () => ({
  before: (handler) => {
    try {
      const band = handler.event.band;
      if (!band || !band._id) {
        return formatJSONResponse({
          body: {
            success: false,
            error: BandDoesntExist
          },
          statusCode: 400,
        });
      }
    }
    catch (ex) {
      console.log('Error in middleware "verifyBandExists"');
      return handleCatch(ex);
    }
  }
});

export interface MiddlewaresToApply {
  parseBand?: boolean,
  findBand?: boolean,
  verifyDbIdLength?: boolean,
  verifyAuth?: boolean,
  verifyPrivate?: boolean,
  verifyPublic?: boolean,
  verifyBandExists?: boolean,
}

export interface MiddlewaresConfig {
  dbIdFieldNames?: string[]
}
