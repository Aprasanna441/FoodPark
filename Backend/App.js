import dotenv from  'dotenv'
 dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDb from "./config/connectDb.js"



const app=express()
const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL
app.use(cors())
connectDb(DATABASE_URL)
app.use(express.json())

app.listen(port,()=>{
    console.log(`App is listening to you at port ${port}` )
})


