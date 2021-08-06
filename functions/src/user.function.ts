import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import { shouldEventRun, markEventTried } from './util/firebase-util';
import { Mail } from '../interfaces/mail';
import { SendgridService } from './util/sendgrid';
const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user, context) => {
    const eventId = context.eventId;
    const should = await shouldEventRun(eventId);
    const mail: Mail = {
      to: { email: user.email || '' },
      text: 'MaterialSearchにご登録いただきありがとうございます！',
      subject: 'MaterialSearchご登録のお知らせ',
      from: { email: 'hide210g@gmail.com' },
    };
    if (should) {
      await db.doc(`users/${user.uid}`).set({
        uid: user.uid,
        name: user.displayName,
        photoUrl: user.photoURL,
        email: user.email,
        isAdmin: false,
      });
      await SendgridService.sendEmail(mail);
      return markEventTried(eventId);
    } else {
      return true;
    }
  });
