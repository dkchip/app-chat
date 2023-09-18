import express,{Request,Response} from "express"
import cors from "cors";
import bodyParser from "body-parser"
import mongoose, { ConnectOptions } from "mongoose";
require("dotenv").config();

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL!,{
    useNewUrlParser: true,
    useUnifiedTopology : true
} as ConnectOptions)
    .then(() => {
        console.log("Connecting to DB")
    })
    .catch((err) => {
        console.log(err)
    })

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!') 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

