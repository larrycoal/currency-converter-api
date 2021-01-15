const express = require("express");
const bodyPaser = require("body-parser");
const axios = require("axios");
var cors = require("cors");
//const { response } = require("express");
const app = express();

app.options("*", cors());
app.use(cors());
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.get("/api/rates", async (req, res) => {
  const { base, currency } = req.query;
  var currencyArray = currency.split(",");
  var xChange;
  var rates;
  var result;
  var date = new Date()
  await axios.get("https://api.exchangeratesapi.io/latest").then((response) => {
    xChange = response.data.rates;
  });
  xChange = {
    ...xChange,
    EUR: 1,
  };
  currencyArray.map((currency) => {
   if(currency.length > 3){
       res.status(400).send("Bad Request.Please Check Params")
   }else{
    rates = {
        ...rates,
        [currency.toUpperCase()]:
          xChange[currency.toUpperCase()] / xChange[base.toUpperCase()],
      };
   }
  });
  result = {
    base: base.toUpperCase(),
    date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
    rates,
  };
  res.status(200)
  res.json({result});
});
app.get('*',(req,res)=>{
    res.status(404).send("invalid route")
})

app.listen(port, () => {
  console.log(`server started ${port} `);
});
