import { formatJSONResponse } from "@libs/apiGateway";
import axios from "axios";
import { UnauthorizedMessage } from "./constants";

const { API_GATEWAY_URL: apiUrl } = process.env;  

const defaultUnauthorizedBody = {
  success: false,
  error: UnauthorizedMessage
};
/**
 * Verifies if a JWT is authentic, according to the verify-token lambda
 * @param event (ApiGatewayRequest) - Event sent by api gateway
 * @returns response of the verifier lambda
 */
export default function verifyJwt(headers): Promise<any> {
  const {
    Authorization,
    userId
  } = headers;
  if (!Authorization || !userId) {
    return Promise.reject(UnauthorizedMessage);
  }
  const token = Authorization.split(' ')[1];
  
  return axios.post(`${apiUrl}/auth/verify-token`, {
    token, userId
  });
}

/**
 * Helper function to handle the unauthorized jwt and give a meaningful response
 * @param data (any) - Response of the verify jwt lambda
 * @returns Formatted JSON response to send to the client
 */
export const sendUnauthorizedJsonResponse = (data): any => {
  if (!data) {
    return formatJSONResponse({
      body: defaultUnauthorizedBody,
      statusCode: 401
    });
  }

  if (!data.success) {
    return formatJSONResponse({
      body: data,
      statusCode: 401
    });
  }
};
