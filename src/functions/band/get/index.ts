import { handlerPath } from '@libs/handlerResolver';
//import schema from './schema';

export const getBandsWithLimitAndPage = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'band/{public}/{limit}/{page}',
      }
    }
  ]
};

export const getBandsWithLimit = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'band/{public}/{limit}',
      }
    }
  ]
};

export const getBands = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'band/{public}',
      }
    }
  ]
};