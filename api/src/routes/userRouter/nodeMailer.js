require("dotenv").config();
const nodemailer = require("nodemailer");
const { NM_PASSWORD, NM_EMAIL } = process.env;

const enviarMail = async (email, name) => {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: NM_EMAIL,
      pass: NM_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
  const transport = nodemailer.createTransport(config);

  const mensaje = {
    from: "ohanapasteleria1@gmail.com",
    to: email,
    subject: "Bienvenid@ a Ohana Pasteleria",
    html: `
      <div style="background-color: #ffc0cb; padding: 20px; width: 50%;">
        <h1 style="color: white;">Bienvenidos a Ohana Pasteleria</h1>
      </div>
      <p>Hola ${name}</p>
      <br />
      <p>¡Gracias por unirte a Ohana Pasteleria! Esperamos que disfrutes de nuestra plataforma. <p/>
      <br />
      <p>No dudes en contactarnos si necesitas ayuda o tienes alguna pregunta.</p>
      `,
  };

  const info = await transport.sendMail(mensaje);
  return info;
};
 // const IDcliente = 781787972829-6oaasrp4vfoe34t3fkbd02bqv1vpktjm.apps.googleusercontent.com
 // const secretoDelCliente = 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
module.exports = enviarMail;
