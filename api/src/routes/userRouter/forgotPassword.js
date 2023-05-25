require('dotenv').config();
const nodemailer = require('nodemailer');
const { NM_PASSWORD, NM_EMAIL } = process.env

const forgotPassword = async ({email, name}, token) => {
    try {
        const resetLink = `http://localhost:3000/login/enviarMail/newPassword?token=${token}`
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
            subject: "Recupera tu contraseña",
            html: `
            <div>
              <h1>Recupera tu contraseña</h1>
              <p>Hola ${name},</p>
              <p>Recibiste este correo porque se solicitó un restablecimiento de contraseña para tu cuenta.</p>
              <p>Por favor, haz clic en el siguiente botón para restablecer tu contraseña:</p>
              <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #ffc0cb; color: white; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
            </div>
          `,
          };
          const info = await transport.sendMail(mensaje);
          console.log(info);
          return info;
    } catch (error) {
        console.log(error.message);
        return {message: error.message}
    }
}

module.exports = forgotPassword