const router = require('express').Router();
const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const productModel = require("../models/product");
var fs = require("fs");
const { json } = require('body-parser');

//add product to cart
router.put('/cart', async (req, res) => {
  const user = await userModel.findOne({ name: req.body.username });
  const prod = await productModel.findOne({_id: req.body.id})
  const idx = prod.index;
  let flag = 0;
  try {
    user.cart.items.map((product) => {
      if (product.id === req.body.id) {
        flag = 1;
        product.quantity = product.quantity + 1;
        product.total += product.price;
        user.cart.total += product.price;
        product.index = product.index
      }
    });
    if (flag == 1) {
      await user.updateOne({ $set: { cart: user.cart } });
      res.json(user);
    } else if (flag === 0) {
      const newItem = {
        quantity: 1,
        id: req.body.id,
        price: req.body.price,
        total: req.body.price,
        index: idx
      };
      await user.cart.items.push(newItem);
      if (user.cart.total == 0) user.cart.total = req.body.price;
      else user.cart.total += req.body.price;
      await user.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.send(err);
  }
});

//get items from a cart
router.put('/show', async (req, res) => {
  try {
    const user = await userModel.findOne({ name: req.body.username });
    res.status(200).json(user.cart);
  } catch (err) {
    res.json(err);
  }
});

//reduce quantity by one
router.put('/quantity/decrease', async (req, res) => {
  try {
    const user = await userModel.findOne({ name: req.body.username });
    user.cart.items.map((product) => {
      if (product.id === req.body.id) {
        if (product.quantity === 1) {
          const findIndex = user.cart.items.findIndex(
            (product) => product.id === req.body.id
          );
          findIndex !== -1 && user.cart.items.splice(findIndex, 1);
        }
        product.quantity--;
        product.total -= product.price;
        user.cart.total -= product.price;
      }
    });
    await user.updateOne({ $set: { cart: user.cart } });
    res.status(200).json(user);
  } catch (err) {
    res.json(err);
  }
});

//increase quantity by one
router.put('/quantity/increase', async (req, res) => {
  try {
    const user = await userModel.findOne({ name: req.body.username });
    user.cart.items.map((product) => {
      if (product.id === req.body.id) {
        product.quantity++;
        user.cart.total += product.price;
        product.total += product.price;
      }
    });
    await user.updateOne({ $set: { cart: user.cart } });
    res.status(200).json(user);
  } catch (err) {
    res.json(err);
  }
});

//delete a product from cart
router.put('/remove', async (req, res) => {
  try {
    const user = await userModel.findOne({ name: req.body.username });
    const findIndex = user.cart.items.findIndex(
      (product) => product.id === req.body.id
    );
    findIndex !== -1 &&
      (user.cart.total -=
        user.cart.items[findIndex].price * user.cart.items[findIndex].quantity);
    findIndex !== -1 && user.cart.items.splice(findIndex, 1);

    await user.updateOne({ $set: { cart: user.cart } });
    res.status(200).json(user);
  } catch (err) {
    res.json(err);
  }
});

//clear the cart
router.put('/clear', async (req, res) => {
  try {
    const user = await userModel.findOne({ name: req.body.username });
    user.cart.items.splice(0, user.cart.items.length);
    user.cart.total = 0;
    await user.updateOne({ $set: { cart: user.cart } });
    res.status(200).json(user);
  } catch (err) {
    res.json(err);
  }
});

//add to wishlist
router.put('/wishlist', async (req, res) => {
  const user = await userModel.findOne({ name: req.body.username });
  let flag = 0;
  try {
    user.wishlist.items.map((product) => {
      if (product.id === req.body.id) {
        flag = 1;
        res.status(200).json({ product: 'found' });
      }
    });

    if (flag === 0) {
      const wish = {
        items: user.wishlist.items,
      };
      const newItem = {
        id: req.body.id,
        price: req.body.price,
      };
      wish.items.push(newItem);
      await user.updateOne({ $set: { wishlist: wish } });
      res.status(200).json(user);
    }
  } catch (err) {
    res.send(err);
  }
});

//get items from wishlist
router.put('/wishlist/show', async (req, res) => {
  try {
    const user = await userModel.findOne({ name: req.body.username });
    res.status(200).json(user.wishlist);
  } catch (err) {
    res.json(err);
  }
});


//update model data
router.post('/model-updation',async (req,res)=> 
{
    //user item interaction
    console.log(req.body);
    const user = await userModel.findOne({ name: req.body.username });
    const idx = JSON.stringify(user.userindex+1); 
    const Products = req.body.products;
      let filePath = '../graphrec/data/user_item_interactions.json';
      let productindices = [];
      Products.map((product)=> {
        productindices.push(product.index);
      })
        fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading the file:', err);
          return res.status(500).json({ message: 'Error reading the file' });
        }
    
        try {
          const jsonData = JSON.parse(data);
          jsonData[idx] = jsonData[idx].concat(productindices);
          fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (err) => {
            if (err) {
              console.error('Error writing to the file:', err);
              return res.status(500).json({ message: 'Error writing to the file' });
            }
          });
        } catch (parseError) {
          console.error('Error parsing the file content as JSON:', parseError);
          res.status(500).json({ message: 'Error parsing the file content as JSON' });
        }


    //item user interaction
    filePath = '../graphrec/data/item_user_interactions.json' 
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading the file:', err);
          return res.status(500).json({ message: 'Error reading the file' });
        }
        try {
          let jsonData = JSON.parse(data)
          for(let i=0; i<productindices.length; i++) {
            const index = productindices[i];
            jsonData[index].push(user.userindex+1);
          }
      
          fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (err) => {
            if (err) {
              console.error('Error writing to the file:', err);
              return res.status(500).json({ message: 'Error writing to the file' });
            }
            res.json({ message: `updated file` });
          });
        }
        catch(err) {
          res.status(500).json(err);
        }
      })
    })
})


module.exports = router;


