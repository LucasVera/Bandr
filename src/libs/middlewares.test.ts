import { BandFactory } from "@common/testHelpers";
import { Band } from "@functions/band/BandModel";
import { verifyPrivate, verifyPublic } from "./middlewares";

const getHandler = (band, userId = '') => ({
  event: {
    band,
    headers: { userId }
  }
});

test('Should allow to continue only if band is private and belongs to user', () => {
  const userId = 'user';
  const anotherUserId = 'anotherUserId';
  let band: Band;
  let handler: any;
  let result: any;

  // band is not private
  band = BandFactory(true, userId);
  handler = getHandler(band, userId);
  result = verifyPrivate().before(handler);
  expect(result).not.toBeFalsy();
  
  // band was not created by user
  band = BandFactory(false, anotherUserId);
  handler = getHandler(band, userId);
  result = verifyPrivate().before(handler);
  expect(result).not.toBeFalsy();

  // meets the criteria
  band = BandFactory(false, userId);
  handler = getHandler(band, userId);
  result = verifyPrivate().before(handler);
  expect(result).toBeFalsy();

});

test('Should allow to continue only if band is public', () => {
  let band: Band;
  let handler: any;
  let result: any;

  band = BandFactory(false);
  handler = getHandler(band);
  result = verifyPublic().before(handler);
  expect(result).not.toBeFalsy();

  band = BandFactory(true);
  handler = getHandler(band);
  result = verifyPublic().before(handler);
  expect(result).toBeFalsy();
});
