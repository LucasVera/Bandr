export const FirestoreCollectionNames = {
  BANDS: 'bands'
};

export const getBandsFirestoreCollection = (firebaseAdmin): FirebaseFirestore.CollectionReference => {
  return firebaseAdmin.firestore().collection(FirestoreCollectionNames.BANDS);
};
