import { CollectionNames, DbName } from "../constants"
import { client } from '../client';

export default async function () {
  if (!client.isConnected()) {
    await client.connect();
  }
  const Bands = client.db(DbName).collection(CollectionNames.BANDS);

  return { Bands, client };
}