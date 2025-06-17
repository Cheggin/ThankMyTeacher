import { Resend } from 'resend';

const resend = new Resend('re_Q9rCnUFD_QDpPV5w1vTj6i8kTarxH43EL');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'reaganhsu123@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});