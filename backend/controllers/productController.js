import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js'



// @Des     Get all products
// @Route   GET api/products
// @Access  Public
const getAllProducts = asyncHandler(async (req, res) => {

   const productsPerPage = process.env.PAGINATION_LIMIT;
   const page = Number(req.query.pageNumber) || 1;

   const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

   const totalProducts = await Product.countDocuments({ ...keyword });

   const products = await Product.find({ ...keyword })
      .limit(productsPerPage)
      .skip(productsPerPage * (page - 1));

   res.json({
      products, page, pages: Math.ceil(totalProducts / productsPerPage)
   });

})


// @Des     Get all products
// @Route   GET api/products/:id
// @Access  Public
const getProductById = asyncHandler(async (req, res) => {

   const product = await Product.findById(req.params.id)
   if (product) {

      return res.json(product);
   } else {
      res.status(404);
      throw new Error('Resource not found');
   }
})



// @Des     Create a product
// @Route   POST api/products
// @Access  Private/ Admin
const createProduct = asyncHandler(async (req, res) => {

   const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample Brand',
      category: 'Sample Category',
      countInStoc: 0,
      numReviews: 0,
      description: 'Sample Description'
   })

   const createdProduct = await product.save();
   res.status(201).json(createdProduct);

})



// @Des     Update a product
// @Route   PUT api/products/:id
// @Access  Private/ Admin
const updateProduct = asyncHandler(async (req, res) => {

   const { name, price, description, image, brand, category, countInStock } = req.body;
   const product = await Product.findById(req.params.id);

   if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock

      const upddatedProduct = await product.save()
      res.status(200).json(upddatedProduct);
   } else {
      res.json(404)
      throw new Error('Product not found')
   }
})

// @Des     Delete a product
// @Route   DELETE api/products/:id
// @Access  Private/ Admin
const deleteProduct = asyncHandler(async (req, res) => {

   const product = await Product.findById(req.params.id)

   if (product) {

      await Product.deleteOne({ _id: product._id })
      res.status(200).json({ message: 'Product deleted' });
   } else {
      res.json(404)
      throw new Error('Product not found')
   }
})

// @Des     Create product review
// @Route   POST api/products/:id/reviews
// @Access  Private
const createProductReview = asyncHandler(async (req, res) => {

   const { rating, comment } = req.body;
   const product = await Product.findById(req.params.id);

   if (product) {
      const alreadyReviewed = product.reviews.find(
         (review) => review.user.toString() === req.user._id.toString()
      )
      if (alreadyReviewed) {
         res.status(400);
         throw new Error('Product already reviewed')
      }

      const review = {
         name: req.user.name,
         rating: Number(rating),
         comment,
         user: req.user._id
      }

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' })

   } else {
      res.status(404)
      throw new Error('Resource not found')
   }
})


// @Des     Get Top Rated products
// @Route   GET api/products/top
// @Access  Public
const getTopProducts = asyncHandler(async (req, res) => {

   const products = await Product.find({}).sort({ rating: -1 }).limit(3)

   res.status(200).json(products);


})


export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts }