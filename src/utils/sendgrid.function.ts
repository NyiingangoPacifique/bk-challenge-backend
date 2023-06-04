import SendGrid from '@sendgrid/mail';
export class SendgridService {
    private KEY:string;
    constructor() {
        this.KEY = process.env.SENDGRID_API_KEY;
        SendGrid.setApiKey(this.KEY);
    }

    async sendEmail(mail: SendGrid.MailDataRequired) {
        return await SendGrid.send(mail);
    }
}
