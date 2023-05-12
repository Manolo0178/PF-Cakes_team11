const { dessertList } = require('./dessertList')
const { Product, Dessert } = require('../../db')

const bddCargada = () => {
    const product =  dessertList.map( async ({name, summary, description, image, price, desserts}) => {
      const pro =  await Product.create({
        name,
        summary,
        description,
        image,
        price
      })
      const dess = desserts.map( async (e) => {
        const des = await Dessert.findOrCreate({ where: {name:  e } })
      })
    })
    console.log('bdd Cargada');
}
module.exports = { bddCargada }