const nodemailer = require("nodemailer");
const axios = require('axios');
const schedule = require('node-schedule');

const URLGet = 'http://localhost:8080/api/feedback/getAllFeedback';
const URLPost = 'http://localhost:8080/api/feedback/editFeedback';

schedule.scheduleJob('1 * * * * *', () => {
  console.log('Running...')
})

function emailSent(id, name, email, question) {
  axios.post(URLPost, {
    id: id,
    name: name,
    email: email,
    question: question,
    sent: true,
  })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function sendEmails() {
  axios.get(URLGet).then(response => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'iamnotsuperman2@gmail.com',
        pass: 'brucewayneisbatman'
      }
    });
    let i = 0;
    while (i in response.data) {
      if (response.data[i].sent == false) {
        let options = {
          from: 'iamnotsuperman2@gmail.com',
          to: 'iamnotsuperman2@gmail.com',
          subject: 'Question From ' + response.data[i].name,
          text: response.data[i].question + '\nPlease reply back to me at: ' + response.data[i].email + '.'
        };
        transporter.sendMail(options, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        emailSent(response.data[i].id, response.data[i].name, response.data[i].email, response.data[i].question)
      }
      i++;
    }
  }).catch(error => {
    console.log(error);
  });
}

let count = 1;
schedule.scheduleJob('*/300 * * * * *', () => {
  sendEmails()
  console.log('E-Mails Sent - Count: ' + count)
  count++;

})




