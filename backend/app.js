const express = require("express");
const cors = require('cors')
const app = express();
const { getCsvData, updateCsvData } = require('./controllers/csvControllers');

app.use(cors());

//middleware
app.use(express.json());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get('/', (req, res) => {
    getCsvData().then((response) => {
        res.json(response)
    }).catch((err) => {
        res.json(err)
    })
    //res.json('Hello!!!!')
})

app.post('/updateData', (req, res) => {
    console.log(req.body);
    if(req && req.body) {
    updateCsvData(req.body).then((response) => {
        console.log("update response: ", response)
        res.json(response)
    }).catch((err) => {
        res.json(err)
    })
}
else {
    res.json('Error')
}
    //res.json('Hello!!!!')
})

module.exports = app;
