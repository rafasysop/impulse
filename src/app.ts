import 'dotenv/config'
import express from 'express';
import { router } from './routes';

const port = 4000

const app = express();
app.use(express.json())
app.use(router);

app.listen(port, () => console.log(`Server is runnin on ${port}`))
