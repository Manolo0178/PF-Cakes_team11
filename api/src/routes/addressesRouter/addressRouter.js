const express = require("express")
const addressRouter = express.Router()
const { Address, User, UserAddress } = require("../../db")

addressRouter.post('/:idUser', async (req, res) => {
  const { idUser } = req.params;
  const { street, postalCode, city, province, number, telephoneContact } = req.body;

  try {
    let user = await User.findOne({ where: { id: idUser } });

    let [address, created] = await Address.findOrCreate({
      where: { street, postalCode, city, province, number },
      defaults: { street, postalCode, city, province, number, telephoneContact }
    });

    if (created) {
      await user.addAddress(address);
    }

    res.send('La dirección se agregó con éxito');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear o relacionar la dirección');
  }
});
// addressRouter.get("/", async(req, res) => {
//   try {
//     let addressRoutes = await Address.findOne()
//     if (addressRoutes) {
//       res.status(200).json(addressRoutes);
//     } else {
//       res.status(400).json({ msg: "direccion no encontrada" });
//     }
//   } catch (error) {
//     res.status(500).json({msg: error.message})
//   }
// })

// addressRouter.get("/", async (req, res)=>{
//   const direcciones = await Address.findAll()
//   res.json(direcciones)
// })

addressRouter.get("/:idUser", async (req, res) => {
  const { idUser } = req.params
  try {
    const user = await User.findOne(
      {
        where: { id: idUser},
        include: [
          {
            model: Address,
            attributes: ['street', 'postalCode', 'city', 'province', 'number', 'telephoneContact' ],
            through: { attributes: ["userId", "addressId"] },
          },
        ],
        attributes: {
          exclude: ['password','name','lastName','image','email', 'contact', 'role', 'created', 'deleted'],
        },
      })

    res.json(user)
  } catch (error) {

    res.status(400).json({error:error.message})
  }
})

addressRouter.delete('/remove/:idUser/:idAddress', async (req, res) => {
    try {
      const { idUser, idAddress } = req.params;
  
      const userAddressEntry = await UserAddress.findOne({
        where: {
          userId: idUser,
          addressId: idAddress,
        },
      });
  
      if (!userAddressEntry) {
        return res.status(404).json({ message: 'La dirección no está asociada a este usuario.' });
      }
  
      await userAddressEntry.destroy();
  
      return res.status(200).json({ message: 'La dirección se ha eliminado exitosamente.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ha ocurrido un error al eliminar la dirección.' });
    }
  });
  

  // {
  //   "street": "carrer de luna",
  //   "postalCode": "8009",
  //   "province": "buenos aires",
  //   "city": "sierra de la ventana",
  //   "telephoneContact": "291775634",
  //   "number": "320"
  // }


  // {
  //   "name": "horacio",
  //   "lastName": "cano",
  //   "password": "123"
  //   "email": "h@gmail.com",
  //   "contact": "111111",
  // }


module.exports = addressRouter;