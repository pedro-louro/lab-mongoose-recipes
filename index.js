const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://USERNAME:PASSWORD@cluster0.nqnrgia.mongodb.net/recipe-app';

async function updateDatabase() {
  // Connection to the database "recipe-app"
  try {
    const x = await mongoose.connect(MONGODB_URI);
    console.log("connected to", x.connections[0].name);
    await Recipe.deleteMany();
    
    //Start coding here
    //Iterarion 2 
    await Recipe.create({
      title: "Sardinha Assada",
      level: "Easy Peasy",
      ingredients: ["Sardinha", "batatas", "salada"],
      cuisine: "mediterranean",
      dishType: "main_course",
      duration: 30,
      creator: "Chef Manel",
    })
    const findRecipe = await Recipe.find({title: "Sardinha Assada"})
    console.log(findRecipe[0].title)

    // Iteration 3
    await Recipe.insertMany(data)
    const getRecepies = await Recipe.find()
    getRecepies.forEach(recipe => {
      console.log(recipe.title)
    })

    // Iteration 4
    const UpdateOne = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    console.log(`Success! Duration updated to 100`)

    // Iteration 5
    await Recipe.deleteOne({title: "Carrot Cake"});
    console.log(`Success! Carrot Cake deleted!`)    


  } catch (e) {
    console.error("Error connecting to the database", e);
  }
  finally{
    mongoose.connection.close();
  }
}

updateDatabase();

