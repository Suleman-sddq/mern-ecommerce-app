import mongoose from "mongoose"
import colors from 'colors'

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`Mongo DB connected to host: ${conn.connection.host}`.bgBrightCyan);
   } catch (err) {
      console.log(`Error: ${err.message}`.brightRed);
      process.exit(1)
   }
}


export default connectDB