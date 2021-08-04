import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import { shouldEventRun, markEventTried } from './util/firebase-util';
const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user, context) => {
    const eventId = context.eventId;
    const should = await shouldEventRun(eventId);
    if (should) {
      await db.doc(`users/${user.uid}`).set({
        uid: user.uid,
        name: user.displayName,
        photoUrl: user.photoURL,
        email: user.email,
        isAdmin: false,
      });
      return markEventTried(eventId);
    } else {
      return true;
    }
  });
