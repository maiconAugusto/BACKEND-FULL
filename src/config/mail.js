const nodemailer = require('nodemailer');
const exhbs = require('express-handlebars');
const nodemailerhbs = require('nodemailer-express-handlebars');
const { resolve } = require('path');

async function create() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const viewPath = resolve(__dirname, '..', 'app', 'view', 'email');
  transporter.use(
    'compile',
    nodemailerhbs({
      viewEngine: exhbs.create({
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs',
      }),
      viewPath,
      extName: '.hbs',
    }),
  );
  return transporter;
}

module.exports = create();
