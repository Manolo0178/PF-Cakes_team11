const axios = require("axios")
const {Product, Dessert} = require("../db.js")
// const {cloudinary} = requiere("cloudinary").v2
// require("dotenv").config()
// cloudinary.config({
// ,
// API_KEY,
// API_SECRET
// }) 
const apiDb = async() => {
  try {
    let response = await axios.get(`https://run.mocky.io/v3/64646805-bddf-4518-882b-a3d97613ea0c`);
    let dataProduct = await response.data.map(product => {
      // const 
      // console.log(dataProduct)
      return {
        name: product.name,
        description: product.description,
        summary: product.summary,
        image: product.image,
        price: product.price,
        desserts: product.desserts.map(dessert => dessert)
      }
    })
    return dataProduct

  } catch (error) {
    console.log(error.message)
  }
}

// console.log(apiDb().then(dat => {console.log(dat)}))


const dataBs = async () => {
  try {
    let apiData = await apiDb()
    for (let i = 0; i < apiData.length; i++) {
      try {
        const { name, description, summary, image, price, desserts } = apiData[i]
        const existingProduct = await Product.findOne({ where: { name } })
        if (existingProduct) {
          // console.log(`Product name already exists, skipping...`)
          continue
        }
        const newProduct = await Product.create({
          name,
          description,
          summary,
          image,
          price
        })
        if (Array.isArray(desserts)) {
          const newInstances = await Promise.all(desserts.map(async dessert => {
            const [newInstances] = await Dessert.findOrCreate({ where: { name: dessert } })
            return newInstances
          }))
          await newProduct.addDesserts(newInstances)
        }
      } catch (error) {
        console.log({ message: error.message })
      }
    }
    // console.log(apiData)
  } catch (error) {
    console.log({ message: error.message })
  }
}
module.exports = { dataBs }