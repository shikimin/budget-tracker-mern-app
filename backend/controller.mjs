import 'dotenv/config';
import express from 'express';
import * as expenses from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/expenses', (req,res) => { 
    expenses.createExpense(
        req.body.name, 
        req.body.date, 
        req.body.cost,
        req.body.expenseType
        )
        .then(expense => {
            res.status(201).json(expense);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Could not create an expense document due to syntax error.' });
        });
});

app.post ('/expensetypes', (req,res) => { 
    expenses.createExpenseType(
        req.body.name, 
        req.body.budget, 
        )
        .then(expenseType => {
            res.status(201).json(expenseType);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Could not create an expense document due to syntax error.' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/expenses/:limit', (req, res) => {
    expenses.retrieveExpenses(req.params.limit)
        .then(expense => { 
            if (expense !== null) {
                res.json(expense);
            } else {
                res.status(404).json({ Error: 'Requested document not found.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Unable to retrieve requested document due to syntax error.' });
        });
});

app.get('/expensetypes', (req, res) => {
    expenses.retrieveExpenseTypes()
        .then(expenseType => { 
            if (expenseType !== null) {
                res.json(expenseType);
            } else {
                res.status(404).json({ Error: 'Requested document not found.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Unable to retrieve requested document due to syntax error.' });
        });
});


// Aggregate for Stats page
const d = new Date();
const thisMonth = d.getMonth()
const thisYear = d.getUTCFullYear()

app.get('/expensestats', (req, res) => {
    expenses.Expense.aggregate(
        [
            { $lookup: {
                from: 'expenseTypes',
                localField: 'expenseType',
                foreignField: 'name',
                as: 'stats'
            }},
            { $unwind: '$stats'},
            { $match: {date: {$gte: new Date(thisYear, thisMonth, 0), $lte: new Date(thisYear, thisMonth + 1, 0)} }},
            { $group: {_id: "$expenseType", total: {$sum:"$cost"}, budget: { $first: "$stats.budget" } }},
            { $sort: {_id: 1}}  // sort in ascending order
        ]
    )
        .then(result => res.send(result))  
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Unable to retrieve requested document due to syntax error.' });
        });
});



// UPDATE controller ************************************
app.put('/expenses/:_id', (req, res) => {
    expenses.updateExpense(
        req.params._id, 
        req.body.name, 
        req.body.date, 
        req.body.cost,
        req.body.expenseType
    )
    .then(expense => {
        res.json(expense);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error: 'Unable to update requested document due to syntax error.' });
    });
});

app.put('/expensetypes/:_id', (req, res) => {
    expenses.updateExpenseType(
        req.params._id, 
        req.body.name, 
        req.body.budget, 
    )
    .then(expenseType => {
        res.json(expenseType);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error: 'Unable to update requested document due to syntax error.' });
    });
});


// DELETE Controller ******************************
app.delete('/expenses/:_id', (req, res) => {
    expenses.deleteExpenseById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Requested document does not exist.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Failed to delete document.' });
        });
});

app.delete('/expensetypes/:_id', (req, res) => {
    expenses.deleteExpenseTypeById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Requested document does not exist.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Failed to delete document.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});