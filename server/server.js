import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

app.use(cors());
app.use(bodyParser.json())

const main = async () => {
    console.log(`Connecting to DB @ ${process.env.DB_URI}`);
    await mongoose.connect(process.env.DB_URI);
}

main().then(`Connected to database`).catch(error => console.log(error));

const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SEVERPORT = server.address().port;
    console.log(`Server is running on http://${SERVERHOST}:${SEVERPORT}`);
});

export default server;