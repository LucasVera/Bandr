import { DbIdLength } from "@common/db/constants";

export default (id: string): boolean => {
  if (!id || id.length !== DbIdLength) {
    return false;
  }

  return true;
};
