import { Algolia } from './util/algolia';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const createMaterial = functions
  .region('asia-northeast1')
  .firestore.document('materials/{id}')
  .onCreate((snap) => {
    const data = snap.data();
    return algolia.saveRecord({
      indexName: 'materials',
      largeConcentKey: 'body',
      data,
    });
  });

export const deleteMaterial = functions
  .region('asia-northeast1')
  .firestore.document('materials/{id}')
  .onDelete((snap) => {
    const data = snap.data();
    if (data) {
      return algolia.removeRecord('materials', data.id);
    } else {
      return;
    }
  });

export const updateMaterial = functions
  .region('asia-northeast1')
  .firestore.document('materials/{id}')
  .onUpdate((change) => {
    const data = change.after.data();
    return algolia.saveRecord({
      indexName: 'materials',
      largeConcentKey: 'body',
      isUpdate: true,
      data,
    });
  });
