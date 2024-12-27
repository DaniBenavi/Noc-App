import nodemailer from 'nodemailer';

import { EmailService, SendMailOptions } from './email-service';

describe('Email Service', () => {
  const emailService = new EmailService();
  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  test('should send Email', async () => {
    const options: SendMailOptions = {
      to: 'darksoul032022@gmail.com',
      subject: 'Test Email',
      htmlbody: '<h1>Test Email</h1>',
    };

    const emailSent = await emailService.sendEmail(options);

    //expect(emailSent).toBe(true);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: options.to,
      subject: options.subject,
      html: options.htmlbody,
      attachments: expect.any(Array),
    });
  });

  test('should send Email with Attachments', async () => {
    const email = 'darksoul032022@gmail.com';

    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: 'Logs del sistema',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        expect.objectContaining({
          filename: 'logs-all.log',
          path: './logs/logs-all.log',
        }),
        expect.objectContaining({
          filename: 'logs-high.log',
          path: './logs/logs-high.log',
        }),
        expect.objectContaining({
          filename: 'logs-medium.log',
          path: './logs/logs-medium.log',
        }),
      ]),
    });
  });
});
