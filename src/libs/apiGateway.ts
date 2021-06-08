import { UnknownError } from "@common/validation/constants";
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";
import { inspect } from "util";
import { handleFirebaseError } from "../common/firebase/formatError";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export interface ResponseBody {
  success: boolean,
  data?: any,
  error?: string,
}

export interface Response {
  statusCode?: number,
  body: ResponseBody
}


/**
 * Centralized response function for all functions. Status code by default is 200
 * @param response (Response) - Object with a set of attributes to respond
 * @returns response for the api gateway
 */
export const formatJSONResponse = (response: Response): any => {
  return {
    statusCode: response.statusCode || 200,
    body: JSON.stringify(response.body)
  };
};

/**
 * Reusable function that formats the exception to be returned
 * @param ex (Exception) - Error object that was catched in the function
 * @returns Properly formatted error
 */
export const handleCatch = (ex): any => {
  let response: Response;

  if (ex && ex.code && ex.message) {
    // firebase error
    response = handleFirebaseError(ex);
    console.log('Firebase Error', inspect(ex, false, 2, true));
  }
  else if (ex && ex.response && ex.response.data) {
    // axios error
    response = handleAxiosError(ex);
  }
  else if (ex && ex.message) {
    response = handleNodeError(ex);
  }

  if (!response) {
    // unknown error
    response = handleUnknownError(ex);
  } 

  return formatJSONResponse(response);
};

const handleAxiosError = (ex): Response => {
  console.log('Axios Error', inspect(ex.response, false, 2, true));
  return {
    body: {
      success: false,
      error: ex.response.data,
    },
    statusCode: ex.response.status
  };
};

const handleNodeError = (ex): Response => {
  console.log('Node error', inspect(ex, false, 2, true));
  return {
    body: {
      success: false,
      error: ex.message,
    },
    statusCode: 500,
  };
};

const handleUnknownError = (ex): Response => {
  console.log('Unknown error', inspect(ex, false, 2, true));
  return {
    body: {
      success: false,
      error: `${UnknownError} occurred`,
    }
  };
};
