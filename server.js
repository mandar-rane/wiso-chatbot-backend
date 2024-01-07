require('dotenv').config();


const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port =4000; 
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit_form', (req, res) => {
  console.log(req.body)
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const slot = req.body.slot;

  console.log('Form data received:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Phone:', phone);
  console.log('Slot:', slot);

  const VONAGE_BRAND_NAME = 'WiseWorks';
  const TO_NUMBER = `91${phone}`;
  const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
  const VONAGE_API_SECRET =  process.env.VONAGE_API_SECRET;

const vonageApiUrl = 'https://rest.nexmo.com/sms/json';

const requestData = {
  from: VONAGE_BRAND_NAME,
  text: `Appointment successfully booked. 
  Name: ${name}
  Slot No: ${slot}
  `,
  to: TO_NUMBER,
  api_key: VONAGE_API_KEY,
  api_secret: VONAGE_API_SECRET,
};

axios.post(vonageApiUrl, null, { params: requestData })
  .then(response => {
    console.log('API Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });


  res.send('Form data received successfully!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
