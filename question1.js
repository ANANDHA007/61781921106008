const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const axios = require('axios');
const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({
    extended:true
}))
const window=10;
let currnumber=[];
let prevnumber=[];
app.use(express.json())
app.get('/numbers/:numberid',function(req,res){
    prevnumber=currnumber;
    const id=req.params['numberid']
   const url=`http://20.244.56.144/numbers/${id}`;
   const response=axios.get(url,{ timeout: 500 })
    const numbers=response.data.numbers;
    currnumber=numbers;
    let avg=0;
    numbers.forEach(element => {
        avg+=element;
    });
    res.send({
        numbers: numbers,
        windowPrevState: prevnumber,
        windowCurrState: currnumber,
        avg: avg.toFixed(2)
    });
})

app.listen(9876,function(){
    console.log("server is running")
})