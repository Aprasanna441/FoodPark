import dotenv from  'dotenv'
 dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDb from "./config/connectDb.js"

import  productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from "./routes/orderRoutes.js"


const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL

const app=express()
app.use(cors())
connectDb(DATABASE_URL)
app.use(express.json())

app.use("/api/products",productRoutes)
app.use("/api/account",userRoutes)
app.use("/api/orders",orderRoutes)






app.listen(port,()=>{
    console.log(`App is listening to you at port ${port}` )
})


