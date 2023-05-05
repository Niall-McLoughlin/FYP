const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const barcodeSchema = new Schema({
  barcode: { type: String, required: true },
  amount: { type: String, required: false },
  ourId: { type: String, required: false },
  type: { type: String, required: false },
  anArray: { type: Array, required: false },
  anObject: { type: Object, required: false }
})

const Barcode = mongoose.model('Barcode', barcodeSchema)



const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: false },
  ourId: { type: String, required: true },
  type: { type: String, required: false },
  anArray: { type: Array, required: false },
  anObject: { type: Object, required: false }
})

const Product = mongoose.model('Product', productSchema) // 'Product' refers to the collection, so maps products collection to productSchema; see lecture notes
////////////////////////////////////////////////////////
const shoppingSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: false },
  ourId: { type: String, required: true },
  type: { type: String, required: false },
  anArray: { type: Array, required: false },
  anObject: { type: Object, required: false }
})
const Shopping = mongoose.model('Shopping', shoppingSchema) // 'Product' refers to the collection, so maps products collection to productSchema; see lecture notes

router.post('/fetchShopping', (req, res, next) => {
  console.log(req.body.testData)
  Shopping.find() // Always returns an array
    .then(shopping => {
      res.json({ 'Shopping': shopping })
      console.log('post')
    })
    .catch(err => {
      console.log('Failed to find: ' + err)
      res.json({ 'Shopping': [] })
    })
})

let nextShoppingId = 0;
router.post('/addShopping', (req, res, next) => {
  new Shopping({ ourId: '' + nextShoppingId, name: req.body.title, price: req.body.price })
    .save()
    .then(result => {
      nextShoppingId++
      console.log('saved shopping to database')
      {/* res.redirect('/') */ }
      res.json({ 'success': true })
    })
    .catch(err => {
      console.log('failed to add shopping: ' + err)
      res.json({ 'success': false })
      {/* res.redirect('/') */ }
    })
})

router.post('/deleteSpecificShopping', (req, res, next) => {
  Shopping.findOneAndRemove({ ourId: req.body.ourID })
 
    .then(resp => {
      res.json({ 'Success': true })
    })
    .catch(err => {
      console.log('Failed to find product: ' + err)
      res.json({ 'Success': false })
    })
})

router.post('/updateSpecificShopping', (req, res, next) => {
  Shopping.find({ ourId: req.body.ourID }) // Always returns an array
    .then(shopping => {
      let specificProduct = shopping[0] // pick the first match
      specificShopping.price = req.body.price
      specificShopping.price ? specificShopping.save() : // Should check for errors here too //#This deals with the add AN IF STATEMENT OT CHECK THAT THE LENGHT OF THE 
        res.json({ 'Success': true })
    })
    .catch(err => {
      console.log('Failed to find shopping: ' + err)
      res.json({ 'success': false })
    })
})

/////////////////////////////////////////////////

const pantrySchema = new Schema({
  name: { type: String, required: true },
  amount: { type: String, required: false },
  ourId: { type: String, required: true },
  type: { type: String, required: false },
  anArray: { type: Array, required: false },
  anObject: { type: Object, required: false }
})
const Pantry = mongoose.model('Pantry', pantrySchema) // 'Pantry' refers to the collection, so maps Pantry collection to pantrySchema; see lecture notes

router.post('/fetchPantry', (req, res, next) => {
  console.log(req.body.testData)
  Pantry.find() // Always returns an array
    .then(pantry => {
      res.json({ 'Pantry': pantry })
      console.log('post')
    })
    .catch(err => {
      console.log('Failed to find: ' + err)
      res.json({ 'Pantry': [] })
    })
})

let nextPantryId = 0;
router.post('/addPantry', (req, res, next) => {
  new Pantry({ ourId: '' + nextPantryId, name: req.body.title, amount: req.body.amount })
    .save()
    .then(result => {
      nextPantryId++
      console.log('saved Pantry to database')
      {/* res.redirect('/') */ }
      res.json({ 'success': true })
    })
    .catch(err => {
      console.log('failed to add Pantry: ' + err)
      res.json({ 'success': false })
      {/* res.redirect('/') */ }
    })
})

router.post('/deleteSpecificPantry', (req, res, next) => {
  Pantry.findOneAndRemove({ ourId: req.body.ourID })
 
    .then(resp => {
      res.json({ 'Success': true })
    })
    .catch(err => {
      console.log('Failed to find pantry: ' + err)
      res.json({ 'Success': false })
    })
})

// router.post('/updateSpecificPantry', (req, res, next) => {
//   Pantry.find({ ourId: req.body.ourID }) // Always returns an array
//     .then(pantry => {
//       let specificPantry = pantry[0] // pick the first match
//       specificPantry.amount = req.body.amount
//       specificPantry.amount ? specificPantry.save() : // Should check for errors here too //#This deals with the add AN IF STATEMENT OT CHECK THAT THE LENGHT OF THE 
//         res.json({ 'Success': true })
//     })
//     .catch(err => {
//       console.log('Failed to find pantry: ' + err)
//       res.json({ 'success': false })
//     })
// })
router.post('/updateSpecificPantry', (req, res, next) => {
  Pantry.find({ ourId: req.body.ourID }) // Always returns an array
    .then(pantry => {
      let specificPantry = pantry[0]; // pick the first match
      specificPantry.amount = req.body.amount;
      
      specificPantry.save()
        .then(savedPantry => {
          res.json({ 'Success': true, 'modifiedCount': 1 });
        })
        .catch(err => {
          console.log('Failed to save pantry: ' + err);
          res.json({ 'success': false });
        });
    })
    .catch(err => {
      console.log('Failed to find pantry: ' + err);
      res.json({ 'success': false });
    });
});

////////////////////////////////////////////

// const recipieSchema = new Schema({
//   name: { type: String, required: true },
//   ourId: { type: String, required: true },
//   desc: {type: String, required: false  },
//   ing1: { type: String, required: false },
//   ing2: { type: String, required: false },
//   ing3: { type: String, required: false },
//   ing4: { type: String, required: false },
  
  
// })
// const Recipie = mongoose.model('Recipie', recipieSchema) // 'Recipe' refers to the collection, so maps Recipe collection to recipeSchema; see lecture notes

// router.post('/fetchRecipe', (req, res, next) => {
//   console.log(req.body.testData)
//   Recipie.find() // Always returns an array
//     .then(recipie => {
//       res.json({ 'Recipie': recipie })
//       console.log('post')
//     })
//     .catch(err => {
//       console.log('Failed to find: ' + err)
//       res.json({ 'Recipie': [] })
//     })
// })

// let nextRecipieId = 0;
// router.post('/addRecipie', (req, res, next) => {
//   new Recipe({ ourId: '' + nextRecipeId, name: req.body.title, price: req.body.price })
//     .save()
//     .then(result => {
//       nextRecipieId++
//       console.log('saved recipe to database')
//       {/* res.redirect('/') */ }
//       res.json({ 'success': true })
//     })
//     .catch(err => {
//       console.log('failed to add recipie: ' + err)
//       res.json({ 'success': false })
//       {/* res.redirect('/') */ }
//     })
// })

// router.post('/deleteSpecificRecipie', (req, res, next) => {
//   Recipie.findOneAndRemove({ ourId: req.body.ourID })
 
//     .then(resp => {
//       res.json({ 'Success': true })
//     })
//     .catch(err => {
//       console.log('Failed to find recipe: ' + err)
//       res.json({ 'Success': false })
//     })
// })

// router.post('/updateSpecificRecipie', (req, res, next) => {
//   Recipie.find({ ourId: req.body.ourID }) // Always returns an array
//     .then(recipe => {
//       let specificRecipie = recipe[0] // pick the first match
//       specificRecipe.price = req.body.price
//       specificRecipe.price ? specificRecipe.save() : // Should check for errors here too //#This deals with the add AN IF STATEMENT OT CHECK THAT THE LENGHT OF THE 
//         res.json({ 'Success': true })
//     })
//     .catch(err => {
//       console.log('Failed to find recipe: ' + err)
//       res.json({ 'success': false })
//     })
// })

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ourId: { type: String, required: true },
  description: { type: String, required: false },
  ingredient1: { type: String, required: false },
  ingredient2: { type: String, required: false },
  ingredient3: { type: String, required: false },
  ingredient4: { type: String, required: false },
  ingredient5: { type: String, required: false },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// router.post('/fetchRecipe', (req, res, next) => {
//   console.log(req.body.testData);
//   Recipe.find()
//     .then(recipe => {
//       res.json({ 'Products': recipe });
//       console.log('post');
//     })
//     .catch(err => {
//       console.log('Failed to find: ' + err);
//       res.json({ 'Products': [] });
//     });
// });

router.post('/fetchRecipe', (req, res, next) => {
  console.log(req.body.testData);
  Recipe.find()
    .then(recipe => {
      res.json({ 'recipes': recipe }); // Change 'Products' to 'recipes'
      console.log('post');
    })
    .catch(err => {
      console.log('Failed to find: ' + err);
      res.json({ 'recipes': [] }); // Change 'Products' to 'recipes'
    });
});


let nextRecipeId = 0;
router.post('/addRecipe', (req, res, next) => {
  new Recipe({
    ourId: '' + nextRecipeId,
    name: req.body.title,
    description: req.body.description,
    ingredient1: req.body.ingredient1,
    ingredient2: req.body.ingredient2,
    ingredient3: req.body.ingredient3,
    ingredient4: req.body.ingredient4,
    ingredient5: req.body.ingredient5
  })
    .save()
    .then(result => {
      nextRecipeId++;
      console.log('saved recipe to database');
      res.json({ 'success': true });
    })
    .catch(err => {
      console.log('failed to add recipe: ' + err);
      res.json({ 'success': false });
    });
});

router.post('/deleteSpecificRecipe', (req, res, next) => {
  Recipe.findOneAndRemove({ ourId: req.body.ourID })
    .then(resp => {
      res.json({ 'Success': true });
    })
    .catch(err => {
      console.log('Failed to find recipe: ' + err);
      res.json({ 'Success': false });
    });
});

router.post('/updateSpecificRecipe', (req, res, next) => {
  Recipe.find({ ourId: req.body.ourID }) // Fixed typo here
    .then(recipe => {
      let specificRecipe = recipe[0];
      specificRecipe.save();
      res.json({ 'Success': true });
    })
    .catch(err => {
      console.log('Failed to find recipe: ' + err);
      res.json({ 'success': false });
    });
});















/////////////////////////////////////////////////













let nextProductId = 0;
router.post('/addProduct', (req, res, next) => {
  new Product({ ourId: '' + nextProductId, name: req.body.title, price: req.body.price })
    .save()
    .then(result => {
      nextProductId++
      console.log('saved product to database')
      {/* res.redirect('/') */ }
      res.json({ 'success': true })
    })
    .catch(err => {
      console.log('failed to addAproduct: ' + err)
      res.json({ 'success': false })
      {/* res.redirect('/') */ }
    })
})


router.post('/getSpecificProduct', (req, res, next) => {
  Product.find({ ourId: req.body.ourID }) // Always returns an array
    .then(products => {
      res.send(JSON.stringify(products[0])) // Return the first one found        // * CHANGE THIS LINE TO 
    })
    .catch(err => {
      console.log('Failed to find product: ' + err)
      res.json({ 'success': false })
    })
})

router.post('/updateSpecificProduct', (req, res, next) => {
  Product.find({ ourId: req.body.ourID }) // Always returns an array
    .then(products => {
      let specificProduct = products[0] // pick the first match
      specificProduct.price = req.body.price
      specificProduct.price ? specificProduct.save() : // Should check for errors here too //#This deals with the add AN IF STATEMENT OT CHECK THAT THE LENGHT OF THE 
        res.json({ 'Success': true })
    })
    .catch(err => {
      console.log('Failed to find product: ' + err)
      res.json({ 'success': false })
    })
})

router.post('/deleteSpecificProduct', (req, res, next) => {
  Product.findOneAndRemove({ ourId: req.body.ourID })
 
    .then(resp => {
      res.json({ 'Success': true })
    })
    .catch(err => {
      console.log('Failed to find product: ' + err)
      res.json({ 'Success': false })
    })
})


exports.routes = router




// router.get('/', (req, res, next) => {
//   Product.find() // Always returns an array
//     .then(products => {
//       res.json({ 'All the Products': products })
//       console.log('get') 
//     })
//     .catch(err => {
//       console.log('Failed to find: ' + err)
//       res.json({ 'Products': [] })
//     })
// })



// post is the one we use 
// router.post('/', (req, res, next) => {
//   console.log(req.body.testData)
//   Product.find() // Always returns an array
//     .then(products => {
//       res.json({ 'Products': products })
//       console.log('post')
//     })
//     .catch(err => {
//       console.log('Failed to find: ' + err)
//       res.json({ 'Products': [] })
//     })
// })