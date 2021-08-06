import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';
import * as client from '@sendgrid/client';
import { Mail } from '../../interfaces/mail';
// import * as admin from 'firebase-admin';

const sendgridKey = functions.config().sendgrid.key;

const manegementEmail = {
  email: functions.config().sendgrid.admin_mail,
  name: 'MaterialSearch運営事務局',
};

client.setApiKey(sendgridKey);
sgMail.setApiKey(sendgridKey);

// const db = admin.firestore();

export class SendgridService {
  static async sendEmail(data: Mail): Promise<void> {
    functions.logger.info(data);
    try {
      await sgMail.send({
        from: manegementEmail,
        ...data,
      });
    } catch (error) {
      throw new functions.https.HttpsError('unknown', error);
    }
  }
}
