const express = require('express');
const dessertRouter = express.Router()
const {Dessert} =  require("../../db.js")

dessertRouter.get("/", async(req, res) => {
  try {
    let dessertsAll = await Dessert.findAll()
    if(dessertsAll) {
      res.status(200).json(dessertsAll.map(dessert => dessert.name))
    } else {
      res.status(404).json({message: "no desserts"})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = dessertRouter