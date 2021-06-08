import { Band } from "@functions/band/BandModel";

export const BandFactory = (
  isPublic = true,
  createdBy = 'test user',
  likedBy = ['someone', 'someone2']
): Band => ({
  createdBy,
  genres: ['test1', 'test2'],
  id: 'test id',
  name: 'test name',
  public: isPublic,
  active: true,
  foundedDate: '2020-01-01',
  likedBy,
  memberNames: ['someone', 'someone2'],
  website: 'www.test.com',
});

