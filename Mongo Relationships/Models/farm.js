//451 ONE TO MANY : Medium qty data sets refer through id provided by mmongo
//we use Schema type ObjectIds which are not sting or any navitve data types
// we use ref to tell which schema to use to populate the db

const mongoose = require("mongoose");

//Initiating db connection
mongoose
  .connect("mongodb://127.0.0.1:27017/famsStand2")
  .then(() => {
    console.log("Mongo Connected!");
  })
  .catch((error) => {
    console.log("Mongo Connection Error ", error);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  season: {
    type: String,
    enums: ["Spring", "Summer", "Fall", "Winter", "Rainy"],
  },
});

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

//   Product.insertMany([
//     {name : 'Melons', price: 70, season: 'Summer'},
//     {name : 'Watermelons', price: 90, season: 'Summer'},
//     {name : 'Mangos', price: 80, season: 'Rainy'},
//     {name : 'Grapes', price: 120, season: 'Spring'},
//     {name : 'Apples', price: 100, season: 'Winter'},
//   ])

async function makeFarm() {
  const farmObj = new Farm({
    name: "Delicious Fruits",
    city: "Chandigarh",
  });
  const melons = await Product.findOne({ name: "Melons" });
  farmObj.products.push(melons);
  await farmObj.save();
}

// makeFarm()

const addProducts = async () => {
  const farm = await Farm.findOne({ name: "Delicious Fruits" });
  const watermelon = await Product.findOne({ name: "Apples" });
  farm.products.push(watermelon);
  await farm.save();
  console.log("LOG farm  ", farm);
};

// addProducts()

//POPULATE : mongoose uses this method to replace the IDs in farms obj with the
// actual products object, using ref

const findFarm = async () => {
  const farmObj = await Farm.findOne({ name: "Delicious Fruits" })
    .populate("products")
    .then((farm) => console.log("LOG farm  ", farm));
};

findFarm();