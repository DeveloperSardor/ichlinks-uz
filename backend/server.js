import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './src/utils/connectDb.js'
import Api from './src/routers/index.js'

   

const app = express();
      
dotenv.config()

const PORT = 5000 || process.env.DB_URL


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors('*'))

app.use('/api', Api)

connectDb()


  
app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})