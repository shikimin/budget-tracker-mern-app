// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500: Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Expense collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const expenseSchema = mongoose.Schema({
	name:           { type: String, required: true},
	date:           { type: Date, required: true, default: Date.now },
	cost:           { type: Number, required: true },
    expenseType:    { type: String, required: true }
}, {collection: 'expenses'});

const expenseTypeSchema = mongoose.Schema({
	name:           { type: String, required: true},
	budget:         { type: Number, required: false, default: 0 },
}, {collection: 'expenseTypes'});


// Compile the model from the schema.
const Expense = mongoose.model('Expense', expenseSchema);
const ExpenseType = mongoose.model('ExpenseTypes', expenseTypeSchema);


// CREATE model *****************************************
const createExpense = async (name, date, cost, expenseType) => {
    const expense = new Expense({ 
        name: name, 
        date: date, 
        cost: cost,
        expenseType: expenseType
    });
    return expense.save();
}

const createExpenseType = async (name, budget) => {
    const expenseType = new ExpenseType({ 
        name: name, 
        budget: budget, 
    });
    return expenseType.save();
}


// RETRIEVE models *****************************************
// Retrieve # of documents determined by lim
const retrieveExpenses = async (lim) => {
    const query = Expense.find().limit(lim);
    return query.exec();
}

const retrieveExpenseTypes = async () => {
    const query = ExpenseType.find();
    return query.exec();
    }


// DELETE model based on _id  *****************************************
const deleteExpenseById = async (_id) => {
    const result = await Expense.deleteOne({_id: _id});
    return result.deletedCount;
};

const deleteExpenseTypeById = async (_id) => {
    const result = await ExpenseType.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateExpense = async (_id, name, date, cost, expenseType) => {
    const result = await Expense.replaceOne({_id: _id }, 
        {
        name: name,
        date: date,
        cost: cost,
        expenseType: expenseType
    },
    { runValidators: true }
    );
    return { 
        _id: _id, 
        name: name,
        date: date,
        cost: cost,
        expenseType: expenseType
    }
}

const updateExpenseType = async (_id, name, budget) => {
    const result = await ExpenseType.replaceOne({ _id: _id }, 
        {
        name: name,
        budget: budget
    },
    { runValidators: true }
    );
    return { 
        _id: _id, 
        name: name,
        budget: budget
    }
}


// Export variables for use in the controller file.
export { 
    Expense, ExpenseType,
    createExpense, createExpenseType, 
    retrieveExpenses, retrieveExpenseTypes, 
    updateExpense, updateExpenseType,
    deleteExpenseById, deleteExpenseTypeById 
}