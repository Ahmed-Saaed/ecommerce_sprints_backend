import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import Art from './handlers/gallery';
import productRoutes from './handlers/productRoute';
import userRoutes from './handlers/userRoute';
import orderRoutes from './handlers/orderRoute';
import dashboardRoutes from './handlers/dashboard';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

// const corsOption = {
//     origin:'some url',
//     optionsSuccessStatus:200
// }
app.use(cors())
app.use(bodyParser.json())

// use instance of app to be able to use gallery and user routes
productRoutes(app);
userRoutes(app);
orderRoutes(app)
dashboardRoutes(app);

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello Artist!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


export default app;