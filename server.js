const express = require('express');
const async = require('async');
const axios = require('axios');

const app = express();

// app.use(express.urlencoded({extended: false}));

function first(cb) {
  axios.get("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
      cb(null, response.data)
    })
}
function second(cb) {
  axios.get("https://jsonplaceholder.typicode.com/users/2")
    .then(response => {
      cb(null, response.data)
    })
}
function third(cb) {
  axios.get("https://jsonplaceholder.typicode.com/users/3")
    .then(response => {
      cb(null, response.data)
    })
}
function fourth(cb) {
  axios.get("https://jsonplaceholder.typicode.com/users/4")
    .then(response => {
      cb(null, response.data)
    })
}
function fifth(cb) {
  axios.get("https://jsonplaceholder.typicode.com/users/5")
    .then(response => {
      cb(null, response.data)
    })
}

app.get('/', (req, res) => {
  res.send("dis be da root");
});

app.get('/series', (req, res) => {
  async.series([first, second, third, fourth, fifth])
    .then(results => {
      res.json(results);
    })
});

app.get('/parallel', (req, res) => {
  async.parallel([first, second, third, fourth, fifth])
    .then(results => {
      res.json(results);
    })
});

app.get('/waterfall', (req, res) => {
  function wFirst(cb) {
    axios.get("https://jsonplaceholder.typicode.com/users/1")
      .then(response => {
        cb(null, response.data.name)
      })
  }
  function wSecond(firstRes, cb) {
    axios.get("https://jsonplaceholder.typicode.com/users/2")
      .then(response => {
        cb(null, firstRes + " " + response.data.name)
      })
  }
  function wThird(secondRes, cb) {
    axios.get("https://jsonplaceholder.typicode.com/users/3")
      .then(response => {
        cb(null, secondRes + " " + response.data.name)
      })
  }
  async.waterfall([wFirst, wSecond, wThird], (err, results) => {
    res.json(results);
  })
});

app.get('/concat', (req, res) => {
  let urls = ["https://jsonplaceholder.typicode.com/users/1",
              "https://jsonplaceholder.typicode.com/users/2",
              "https://jsonplaceholder.typicode.com/users/3",
              "https://jsonplaceholder.typicode.com/users/4",
              "https://jsonplaceholder.typicode.com/users/5"];

  function getUserName(url, cb) {
    axios.get(url).then(response => {
      cb(null, response.data.name)
    })
  }

  async.concat(urls, getUserName).then(result => {
    res.json(result);
  })
})

app.listen(3000, () => {
  console.log("Listening on 3000...")
});
