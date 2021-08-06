export interface Mail {
  to: EmailData | EmailData[];
  text: string;
  subject: string;
  from?: EmailJSON;
  bcc?: EmailData | EmailData[];
  html?: string;
  templateId?: string;
  dynamicTemplateData?: { [key: string]: any };
}

type EmailData = string | EmailJSON;

interface EmailJSON {
  name?: string;
  email: string;
}
