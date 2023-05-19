require("dotenv").config()
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Op } = require("sequelize")
const { User, Address } = require("../../db");
const { SECRET } = process.env



userRouter.post("/login", async (req, res) => {
  const { email, contact, password } = req.body;
  try {
    let user;
    let passwordsMatch = false;

    if (email) {
      user = await User.findOne({ where: { email, deleted: false }});
    } else {
      user = await User.findOne({ where: { contact, deleted: false } });
      console.log(`nombre ${user.name}`)
    }

    if (user) {
      passwordsMatch = await bcrypt.compare(password, user.password);
    }

    if (passwordsMatch) {
      const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: "1m" });
      res.json({token});
    } else {
      res.status(401).send("Credenciales inválidas");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});




userRouter.post("/create", async (req, res) => { // Esta ruta es para crear un usuario
  const { name, email, contact, lastName, password, image } = req.body;

  try {
    let user = await User.create({ name, email, contact, lastName, password, image });

  const { password: userPassword, ...userWithoutPassword } = user.toJSON();
        res.status(201).json(userWithoutPassword);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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
            attributes: ['shippingAddress', 'postalCode', 'city', 'location'],
            through: { attributes: [] },
          },
        ],
        attributes: {
          exclude: ['password'],
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
            attributes: ['shippingAddress', 'postalCode', 'city', 'location'],
            through: { attributes: [] },
          },
        ],
        attributes: {
          exclude: ['password'],
        },
      });

      res.json(allUser);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});



userRouter.put("/modifyUser/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const { name, email, contact, lastName, image } = req.body;

  const user = await User.findOne({ where: { id: idUser } });

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  user.name = name || user.name;
  user.lastName = lastName || user.lastName
  user.email = email || user.email;
  user.contact = contact || user.contact;
  user.image = image || user.image
  await user.save();

  res.json({ message: "Usuario modificado exitosamente" });
});


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
        res.send('La contraseña se modificó exitosamente');
      } else {
        res.send("Contraseña incorrecta");
      }
    } else {
      res.status(404).send('No se encontró un usuario con ese ID');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});


userRouter.delete("/delete/:idUser", async (req, res)=> {
  const { idUser } =req.params
  try {
    const deleted = true;
    await User.update({ deleted }, { where:{ id: idUser }} )
    res.send("Usuario eliminado correctamente")
  } catch (error) {
    console.log(error)
    res.status(404).json({error: error.message})
  }
})

module.exports = userRouter