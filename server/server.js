import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';

import { peeps } from './routes/peeps.js';

config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(`/peeps`, peeps)

const main = async () => {
    console.log(`Connecting to DB @ ${process.env.DB_URI}`);
    await mongoose.connect(process.env.DB_URI);
}

main().then(`Connected to database`).catch(error => console.log(error));

const server = app.listen(port, () => {
    const SEVERPORT = server.address().port;
    console.log(`Server is running on http://localhost:${SEVERPORT}`);
});

export default server;