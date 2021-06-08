import { CannotDeleteOtherPeoplesBand } from "@common/db/constants";
import Validation from "@common/validation/ValidationInterface";
import { Collection, ObjectId } from "mongodb";
import { Band } from "../BandModel";

export const validateUpdateData = async (input: Band, userId: string, Bands: Collection): Promise<Validation[]> => {
  const validations: Validation[] = [];
  const {
    id,
  } = input;

  const band = await Bands.findOne({ _id: new ObjectId(id) });
  if (band.createdBy !== userId) {
    validations.push({ message: CannotDeleteOtherPeoplesBand });
  }

  return validations;
};
