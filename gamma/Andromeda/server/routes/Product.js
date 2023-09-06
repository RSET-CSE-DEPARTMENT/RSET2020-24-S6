const router = require("express").Router();
const productModel = require("../models/product");
const userModel = require("../models/users");
var fs = require("fs");

//get all products
router.get("/", async(req,res)=> {
  try{
    const products =  await productModel.find({});  
    res.status(200).json(products);
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

router.get("/featured", async(req,res)=> {
  try{
    const products =  await productModel.find({ featured: true});
    res.status(200).json(products);
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

//get one product
router.get("/:id", async(req,res)=> {
  try{
    const products =  await productModel.findById(req.params.id);

    res.status(200).json(products);
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

//get products by category
router.get("/category/:category", async(req,res)=> {
    try{
        const products = await productModel.find({ category: req.params.category});
        res.status(200).json(products);
      }
      catch(err) {
        return res.status(500).json(err);
      }
});

//get products by name
router.get("/productname/:name", async(req,res)=> {
  try{
      const products = await productModel.find({ name: req.params.name});
      res.status(200).json(products);
    }
    catch(err) {
      return res.status(500).json(err);
    }
});

//add product
router.post("/", async(req,res)=> {
    try {
        const newProduct = new productModel({
            name: req.body.name,
            highlights: req.body.highlights,
            category: req.body.category,
            price: req.body.price,
            img: req.body.img,
            featured:req.body.featured
        });

        const Product = await newProduct.save();
        res.status(200).json(Product);
    }
    catch(err) {
        return res.status(500).json(err);
    }
});

//product search
router.put("/search",async(req,res)=> {
  try{
    const user = userModel.findOne({name: req.body.username}); 
    const product = productModel.findById(req.body.product_id);
    let flag = -1;
    user.searchData.map((item)=> {
      if(product.name === item.product) {
        flag = 1;
        item.value = item.value+1;
      }
    });
    
    if(flag === -1) {
      const data = {product: product.name, value: 1}
      user.searchData.push(data);
      await user.save();
    }

  }
  catch(error) {
    return res.status(500).json(error);
  }
})

//update rating
router.put("/:id/rating", async(req,res)=> {
    try {
        const product = await productModel.findById(req.params.id);
        if(product.rating) {
          product.rating.map((rate)=> {
            if(rate.username === req.body.username)
            {
              flag = 1;
              res.status(200).json(product);
            }
          })
        }
        const updatedRating = {
          rating: req.body.newrating,
          username: req.body.username
        }
        await product.updateOne({ $push: { rating: updatedRating} });
        const user = await userModel.findOne({name: req.body.username})

        const data = {
          id: req.params.id,
          rating: req.body.newrating
        }
        await user.updateOne({$push: {rated: data}})

        console.log(rating);
        res.status(200).json({rating: req.body.newrating});
    }
    catch(err) {
        console.log(err);
    }
});

//update review
router.put("/:id/review", async(req,res)=> {
  try {
      const product = productModel.findById(req.params.id);
      await product.updateOne({ $push: { reviews: req.body.newreview} });
      console.log(req.body.newreview);
      res.status(200).json("The review has been updated");
  }
  catch(err) {
      console.log(err);
  }
});

router.put("/remove", async (req,res)=> {
  try {
      const product = await productModel.findById(req.body.id);
      if(req.body.username === "admin") {  
          await product.deleteOne({ id: req.body.id});
          res.status(200).json("the product has been removed");
      }   
      else {
          res.status(403).json("you are not an admin");
      }
  }
  catch(err) {
      res.status(500).json(err);
  }
});

//update rating dataset
router.post("/rating-updation", async(req,res)=> {
  try {
    //user item rating
    console.log(req.body);
    const user = await userModel.findOne({ name: req.body.username });
    const idx = JSON.stringify(user.userindex+1);
    let filePath = '../graphrec/data/user_item_ratings.json';
    
    let ratings = [];
    const productindices = [];
    const products = req.body.products;
    const userratings = user.rated;
    products.map((product) => {
      const id = product.id;
      let flag = 0;
      productindices.push(JSON.stringify(product.index));
      userratings.map((rate)=> {
        if(id === rate.id) {
          ratings.push(rate.rating);
          flag =1 ;
        }
      })

      if(flag === 0) {
        ratings.push(3);
      }
    })

    console.log("A");
    fs.readFile(filePath, 'utf8', (err, data) => { 
      if (err) {
        console.error('Error reading the file:', err);
        return res.status(500).json({ message: 'Error reading the file' });
      }
  
      try {
        const jsonData = JSON.parse(data);
        jsonData[idx] = jsonData[idx].concat(ratings);
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

  //item user ratings
  filePath = '../graphrec/data/item_user_ratings.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return res.status(500).json({ message: 'Error reading the file' });
      }
      try {
        const jsonData = JSON.parse(data);
        for(let i=0; i<productindices.length; i++) {
          jsonData[productindices[i]].push(ratings[i]);
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
  }
  catch(err) {
      return res.status(500).json("didnt even do anything");
  }
});

module.exports = router;