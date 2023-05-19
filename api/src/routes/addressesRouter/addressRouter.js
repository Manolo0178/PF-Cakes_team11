const express = require("express")
const addressRouter = express.Router()
const { Address, User, UserAddress } = require("../../db")

addressRouter.put('/:idUser', async (req, res)=> {
    const { idUser } = req.params
    const { shippingAddress, postalCode, city, location  } = req.body

    let user = await User.findOne({ where : {id: idUser} })

    if(shippingAddress.length > 0) {
        await Promise.all(
          shippingAddress.map(async (shippingAddress) => {
            let [address] = await Address.findOrCreate({
              where: { shippingAddress, postalCode, city, location },
            });
             await user.addAddress(address) 
          })
        );
      }
      res.send("la direccion se agrego con exito")
})


addressRouter.get("/:idUser", async (req, res) => {
  const { idUser } = req.params
  try {
    const user = await User.findOne(
      {
        where: { id: idUser},
        include: [
          {
            model: Address,
            attributes: ['shippingAddress', 'postalCode', 'city', 'location'],
            through: { attributes: ["userId", "addressId"] },
          },
        ],
        attributes: {
          exclude: ['password','name','lastName','image','email', 'contact', 'role', 'created', 'deleted'],
        },
    })
    res.json(user)
  } catch (error) {
    console.log(error)
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
  //   "shippingAddress": ["carrer de luna 333"],
  //   "postalCode": 8009,
  //   "city": "buenos aires",
  //   "location": "sierra de la ventana"
  // }

module.exports = addressRouter;