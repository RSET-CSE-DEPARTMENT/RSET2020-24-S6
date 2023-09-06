const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const url = 'mongodb+srv://admin:admin@andromeda.esfay3s.mongodb.net/andromeda';
const { config } = require('dotenv');

config({ path: './config/config.env' });

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.once('open', () => {
  console.log('connected');
});

//middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

const authRouter = require('./routes/Auth');
app.use('/auth', authRouter);
const userRouter = require('./routes/Users');
app.use('/user', userRouter);
const productRouter = require('./routes/Product');
app.use('/product', productRouter);
const cartRouter = require('./routes/Cart');
app.use('/order', cartRouter);
const paymentRouter = require('./routes/Payment');

const chatRouter = require('./routes/chat');
app.use('/gpt/chat', chatRouter);

app.use('/api', paymentRouter);

app.get('/run-python', (req, res) => {
  const pythonFile = '../graphrec/run_GraphRec_example.py';
  const pythonCommand = 'python';

  exec(`${pythonCommand} ${pythonFile}`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error executing Python script: ${error.message}`);
      return;
    }

    const result = stdout || stderr || 'Python script executed successfully.';
    console.log(result);
    res.status(200).json(result);
  });
});

app.post('/modify-file', (req, res) => {
  const { k } = req.body;
  const filePath = '../graphrec/data/test_user_array.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).json({ message: 'Error reading the file' });
    }

    try {
      const numbersArray = JSON.parse(data);
      const modifiedArray = Array.from(
        { length: numbersArray.length },
        () => k
      );

      fs.writeFile(filePath, JSON.stringify(modifiedArray), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to the file:', err);
          return res.status(500).json({ message: 'Error writing to the file' });
        }
        res.json({
          message: `Successfully replaced all values with '${k}' and saved to the file.`,
        });
      });
    } catch (parseError) {
      console.error('Error parsing the file content as JSON:', parseError);
      res
        .status(500)
        .json({ message: 'Error parsing the file content as JSON' });
    }
  });
});

app.listen('3002', () => {});
