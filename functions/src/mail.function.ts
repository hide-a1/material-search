import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { SendgridService } from './util/sendgrid';
import { Mail } from '../interfaces/mail';
// import { markEventTried, shouldEventRun } from './util/firebase-util';

const db = admin.firestore();

export const sendMail = functions
  .region('asia-northeast1')
  .https.onCall(async (data: Mail) => {
    return SendgridService.sendEmail(data);
  });

// export const sendFirstMail = functions
//   .region('asia-northeast1')
//   .auth.user()
//   .onCreate(async (user, context) => {
//     const eventId = context.eventId;
//     const should = await shouldEventRun(eventId);
//     const mail: Mail = {
//       to: { email: user.email || '' },
//       text: 'MaterialSearchにご登録いただきありがとうございます！',
//       subject: 'MaterialSearchご登録のお知らせ',
//       from: { email: 'hide210g@gmail.com' },
//     };
//     if (should) {
//       await SendgridService.sendEmail(mail);
//       return markEventTried(eventId);
//     } else {
//       return true;
//     }
//   });

export const sendMarketingMail = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 5 minutes')
  .onRun(async (context) => {
    functions.logger.info('This will be run every 5 minutes!', context);
    const users = await db
      .collection('users')
      .get()
      .then((snapshot) => {
        functions.logger.info(snapshot);
        return snapshot.docs;
      });

    return users;
  });

// const msg = {
//   to: '', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent');
//   })
//   .catch((error) => {
//     console.error(error);
//   });
