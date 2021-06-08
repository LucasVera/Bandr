export const DbName = 'bandr';
export const CollectionNames = {
  BANDS: 'bands'
};

export const ErrorDeleting = 'An Unknown error occurred executing a delete operation';
export const ErrorUpdating = 'An Unknown error occurred executing an update operation';
export const ErrorAddingLike = 'An Unknown error occurred adding a like to a band';
export const BandDoesntExist = 'Band doesn\'t exist';
export const CannotDeleteOtherPeoplesBand = 'Cannot delete a band that wasn\'t created by you';
export const CannotDeletePublicBand = 'Cannot delete a band that\'s public';
export const NotAllowedToChangeOtherPeoplesBands = 'Cannot do that on a band that wasn\'t created by you.';
export const NotAllowedOnPrivateBands = 'Cannot do that on a private band.';
export const NotAllowedOnPublicBands = 'Cannot do that on a public band.';

/**
 * Helper function to personalize the validation message when a mongo id doesn't
 * comply with mongo standards
 * @param propName (string) - Property name
 * @returns Validation message
 */
export const dbIdComplianceMessage = (propName: string): string => `${propName} must not be empty and must have ${DbIdLength} characters`;
export const DbIdLength = 24; // Mongo object ids must be a string of 24 chars
