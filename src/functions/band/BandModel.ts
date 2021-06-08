/**
 * Model for a band in Bandr
 */
export interface Band {
  id: string,
  name: string,
  genres: string[],
  memberNames?: string[],
  foundedDate?: string,
  likedBy?: string[],
  website?: string,
  active?: boolean,
  createdBy: string,
  public: boolean,
}

export const inputToBandMapper = (input): Band => {
  if (!input) return null;
  return {
    id: input.id || input.bandId,
    name: input.name,
    genres: input.genres || [],
    active: input.active,
    foundedDate: input.foundedDate,
    memberNames: input.memberNames || [],
    website: input.website,
    createdBy: input.createdBy || input.userId,
    public: input.public,
    likedBy: input.likedBy || [],
  };
};

/**
 * Helper function to remove empty, null or undefined fields from the object
 * mainly to avoid unwanted nulls when performing an update
 * @param band (BandModel) - Band to clear the nulls of
 * @returns Band without null or empty fields
 */
export const cleanNullFields = (band: Band): Band => {
  if (typeof band.active !== "boolean") {
    delete band.active;
  }
  if (typeof band.createdBy !== "string") {
    delete band.createdBy;
  }
  if (typeof band.foundedDate !== "string") {
    delete band.foundedDate;
  }
  if (!Array.isArray(band.genres)) {
    delete band.genres;
  }
  if (!Array.isArray(band.likedBy)) {
    delete band.likedBy;
  }
  if (!Array.isArray(band.memberNames)) {
    delete band.memberNames;
  }
  if (typeof band.name !== "string") {
    delete band.name;
  }
  if (typeof band.public !== "boolean") {
    delete band.public;
  }
  if (typeof band.website !== "string") {
    delete band.website;
  }

  return band;
};
