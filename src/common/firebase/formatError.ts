// This is another way to do it, which gives more control but it takes more
// time to implement. Define the codes here (can be found in the firebase docs)
// And personalize the message using a if-elseif or switch case:

import { Response } from "@libs/apiGateway";
import { ExpiredTokenValidationMessage } from "../validation/constants";

const FirebaseAuthErrorCodes = {
  TOKEN_EXPIRED: 'auth/id-token-expired',
  USER_DISABLED: 'auth/user-disabled',
};

export interface FirebaseError {
  code: string,
  message: string
}

export const handleFirebaseError = (ex: FirebaseError): Response => {
  const { code, message } = ex;
  if (code === FirebaseAuthErrorCodes.TOKEN_EXPIRED) {
    // Avoid the default firebase message in this case
    return {
      body: {
        success: false,
        error: ExpiredTokenValidationMessage,
      },
      statusCode: 401,
    };
  }

  return {
    body: {
      success: false,
      error: `Error: ${message} - Code: ${code}`,
    },
    statusCode: 500,
  };
};
