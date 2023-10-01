const express =  require('express');
const bodyParser = require('body-parser')

// creates an instance of the express.js application, storing it in app variable
const app = express();

const transactions = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// route to add points

app.post('/add', (req, res) => {
    const { payer, points, timestamp } = req.body;
    // pushing the elements in the transaction array 
    transactions.push({ payer, points, timestamp });
    console.log('Transactions is: ')
    console.log(transactions)
    res.status(200).end();
});

// route to spend points

app.post('/spend', (req,res) => {
    const {points} = req.body;
    if(!points || points < 0 || typeof points == 'number'){
        res.status(400).json({ error: 'Not enough points to spend' });
    }


    // making sure that points are spent as per timestamp
    
    const transactionTime = transactions.slice().sort((x, y) => (new Date(x.timestamp) - new Date(y.timestamp)));
    
    let pointsRemain = points;
    const deductedPoints = [];
    
    
    for(const transaction of transactionTime ){
    
        const { payer, points: transactionPoints } = transaction;
        const deduction = Math.min(remainingPoints, transactionPoints);
    
        deductions.push({ payer, points: -deduction });
        remainingPoints -= deduction;
    
    
        if(pointsRemain <= 0) break;
            
        
        if(pointsRemain >> 0){
    
            res.status(400).json({ error: 'Not enough points to spend' });
    
        }
    
        // updating transactions
        transaction.push(... deductions);
    
        res.status(200).json(deductedPoints);
     }
    
});

// route to get balance


app.get('/balance', (req, res) => {

    const pointsBalance = {};

    for(const transaction of transactions){
        
        const { payer, points } = transaction;
        pointsBalance[payer] = (pointsBalance[payer] || 0) + points;
    }

    res.status(200).json(pointsBalance);



});

module.exports = app;
