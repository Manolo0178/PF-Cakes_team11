require("dotenv").config();
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, Address } = require("../../db");
const { SECRET } = process.env
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const enviarMail = require("./nodeMailer")
const forgotPassword = require('./forgotPassword')


const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
}) 

// RUTA LOGIN

userRouter.post("/login", async (req, res) => {
  const { email, contact, password } = req.body;

  try {
    let user;
    let passwordsMatch = false;
    
    if (email) {
      user = await User.findOne({ where: { email, deleted: false } });
    } else {
      user = await User.findOne({ where: { contact, deleted: false } });
      console.log(`nombre ${user.name}`);
    }

    if (user) {
      passwordsMatch = await bcrypt.compare(password, user.password);
    }

    if (passwordsMatch) {
      const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: "1m" });
      res.json({token, id:user.id});
    } else {
      res.status(401).json({error:"Credenciales inválidas"});
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// RUTA CREAR USUARIO
userRouter.post("/create", async (req, res) => { // Esta ruta es para crear un usuario
  const { name, email, contact, lastName, password, googleId, facebookId } = req.body;
  try {

      const userVerification = await User.findOne({ where: { email }})

      if(userVerification){
        if(userVerification.googleId === googleId){
          return res.json({ id:userVerification.id })
        } 
        return res.status(400).send("Ya hay un usuario registrado con ese email")
      } else{
        let user = await User.create({ name, email, contact, lastName, password, googleId, facebookId });
    
        const { password: userPassword, ...userWithoutPassword } = user.toJSON();

        enviarMail(email,name)

        res.status(201).json(userWithoutPassword);
      }

  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });

  }

});

// RUTA TODOS LOS USUARIO O POR NAME
userRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const user = await User.findOne({
        where: {
          [Op.and]: [{ name: { [Op.iLike]: `%${name}%` } }, { deleted: false }],
        },
        include: [
          {
            model: Address,
            attributes: ['street', 'postalCode', 'city', 'province', 'number', 'telephoneContact' ],
            through: { attributes: [] },
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      });
      
      if (!user) {
        res.status(404).send(`El usuario ${name} no se encontró`);
      } else {
        res.json(user);
      }
    } else {
      const allUser = await User.findAll({
        where: {
          deleted: false,
        },
        include: [
          {
            model: Address,
            attributes: ['street', 'postalCode', 'city', 'province', 'number','telephoneContact', ],
            through: { attributes: [] },
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      });

      res.json(allUser);
    }
  } catch (error) {

    res.status(400).json({ error: error.message });
  }
});


// RUTA PARA MODIFICAR USUARIO !!!OJO SIN PASSWORD!!!
userRouter.put("/modifyUser/:idUser", async (req, res) => {
  
  const { idUser } = req.params;

  const { name, email, contact, lastName, image } = req.body;

  
  const user = await User.findOne({ where: { id: idUser } });
  
  
    const result = await cloudinary.uploader.upload(image, {
      folder: "imgen",
    });
   
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  user.name = name || user.name;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.image = result.secure_url || user.image;
  user.contact = contact || user.contact;
  await user.save();

  res.json({ message: "Usuario modificado exitosamente" , user:user.image});
});

//  RUTA PARA MODIFICAR LA PASSWORD
userRouter.put("/modifyPassword/:idUser", async (req, res) => {
  const { idUser } = req.params;
  let { password, newPassword } = req.body;
  try {
    let user = await User.findOne({ where: { id: idUser } });

    if (user) {
      let passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) {

        newPassword = bcrypt.hashSync(newPassword, 10);
        user.password = newPassword;
        await user.save();
        
 
        res.send("La contraseña se modificó exitosamente");
        
      } else {
        res.status(404).send("Contraseña incorrecta");
      }
    } else {
      res.status(404).send("No se encontró un usuario con ese ID");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
// MODIFICAR LA PASSWORD POR PERDIDA
userRouter.put("/forgotPass", async (req, res) => {
  try {
    let { email, newPassword, token  } = req.body;

    const user = await User.findOne({where:{ email:email}})

    if(!user){ 
      res.status(404).json({message: 'Correo electronico no encontrado'})
    }
    
    jwt.verify(token, SECRET)

      newPassword = bcrypt.hashSync(newPassword, 10);
        user.password = newPassword;
        await user.save();

     res.status(200).json({message:'Contraseña actualizada correctamente'})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: 'Token expirado intentalo nuevamente'})
  }
})

//ENVIAR MAIL POR PERDIDA DE CONTRASEÑA
userRouter.post('/enviarMail', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({where:{email: email}})

    
    if(!user){
      res.status(404).json({message: 'Correo electrónico no encontrado' })
    }else{
      const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: "5m" });
  
      forgotPassword(user, token)
  
      res.status(200).json({message:'Se envio un mensaje a tu correo para recuperar tu contraseña expira en 5 min'})
    }

  } catch (error) {
   res.status(500).json({message: error.message}) 
  }
})

// RUTA PARA ELIMINAR USUARIO
userRouter.delete("/delete/:idUser", async (req, res)=> {
  const { idUser } =req.params
  try {
    const deleted = true;
    await User.update({ deleted }, { where: { id: idUser } });
    res.send("Usuario eliminado correctamente");
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
})

// RUTA PARA BUSCAR POR ID
userRouter.get('/:idUser',  async (req, res) => {
  try {
    const { idUser } = req.params;
    const userId = await User.findOne({
      where: {
        [Op.and]: [{ id: idUser }, { deleted: false }],
      },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Address,
          attributes: [
            "street",
            "postalCode",
            "city",
            "province",
            "number",
            "telephoneContact",
          ],
          through: { attributes: [] },
        },
      ],
    });
    const { password: userPassword, ...userWithoutPassword } = userId.toJSON();

    if (!userId) {
      res.status(404).send("user not found by id");
    } else {
      res.status(200).json(userWithoutPassword);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// prueba de commit
module.exports = userRouter;
