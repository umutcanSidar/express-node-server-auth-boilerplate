import express from 'express';
import * as dotenv from 'dotenv';
import { AppRoutes } from './routes/index.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = new express();
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.URI, options)
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello world!');
});

AppRoutes(app);

app.listen(PORT, () => console.log(`The server has been started on ${PORT}!`));
