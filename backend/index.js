import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectToDB from './services/db.js'
import rescueRouter from "./routes/rescueRoute.js"
import donationRouter from "./routes/donationRoute.js"
import volunteerRouter from "./routes/volunteerRoute.js"
import adoptionRouter from "./routes/adoptionRoute.js"
import router from './routes/authRoute.js'

import multer from 'multer'
import path from 'path'
const app = express()

const PORT = process.env.PORT || 3000;

app.use(cors(
    { origin:"*" },
    { Credential: true }
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.use('/auth', router)
app.use("/rescues", rescueRouter)
app.use("/razorpay", donationRouter)
app.use("/volunteer", volunteerRouter)
app.use("/adoption", adoptionRouter)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
  })
}

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, ()=>{
    connectToDB()
    
    console.log(`Server is running on PORT : ${PORT}`)
})