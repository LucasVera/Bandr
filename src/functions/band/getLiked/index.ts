import { handlerPath } from '@libs/handlerResolver';

export const getLikedBandsWithLimitAndPage = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'band/like/{limit}/{page}',
      }
    }
  ]
};

export const getLikedBandsWithLimit = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'band/like/{limit}',
      }
    }
  ]
};

export const getLikedBands = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'band/like',
      }
    }
  ]
};