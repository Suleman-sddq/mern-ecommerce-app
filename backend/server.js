import path from 'path'
import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config();
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/uploadRoutes.js'
import cors from 'cors'

const port = process.env.PORT || 8000;

connectDB();   //Connect to Database
const app = express()



// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Cookie parser middleware
app.use(cookieParser());
app.use(cors());

// API
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes);


if (process.env.NODE_ENV === 'production') {

   const __dirname = path.resolve();

   app.use('/uploads', express.static('./uploads'));

   app.use(express.static(path.join(__dirname, '/frontend/build')));

   app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));




} else {
   const __dirname = path.resolve();
   app.use('/uploads', express.static(path.join(__dirname, './uploads')));

   app.get('/', (req, res) => {
      res.send('API is running....');
   });
}


app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
   console.log(`Server is running on port:${port}`.bgBrightGreen);
})