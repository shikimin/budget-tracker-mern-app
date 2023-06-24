import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ExpenseList from '../components/ExpenseList';

function LogPage({ setExpense }) {
    // Use the Navigate for redirection
    const redirect = useNavigate();

    // Use state to bring in the data
    const [expenses, setExpenses] = useState([]);

    // RETRIEVE the entire list of expenses
    const loadExpenses = async () => {
        const response = await fetch('/expenses/30');
        const expenses = await response.json();
        setExpenses(expenses);
    } 

    // UPDATE a single expense
    const onEditExpense = async expense => {
        setExpense(expense);
        redirect("/edit-expense");
    }

    // DELETE a single expense  
    const onDeleteExpense = async _id => {
        const response = await fetch(`/expenses/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/expenses');
            const expenses = await getResponse.json();
            setExpenses(expenses);
        } else {
            console.error(`Failed to delete expense with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD all the expenses
    useEffect(() => {
        loadExpenses();
    }, []);

    // DISPLAY the expenses
    return (
        <>
            <h2>Log of Expenses</h2>
            <article className="info">
                <h3>Info:</h3>
                    <p>This page is used to log various expenses. The last 30 expenses are shown in the order in which they were entered.</p>
                    <p>
                        Clicking the icon next to "Edit" in the table below will take you to a page where you can add a new expense to the log. 
                        Each entry can be edited or deleted by clicking on the icons in the Edit and Delete columns respectively.
                    </p>
            </article>

            <article className="displayExpenses">
                <ExpenseList 
                    expenses={expenses} 
                    onEdit={onEditExpense} 
                    onDelete={onDeleteExpense} 
                />
            </article>
        </>
    );
}

export default LogPage;