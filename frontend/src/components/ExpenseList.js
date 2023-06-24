import React from 'react';
import Expense from './ExpenseRow';
import { useNavigate } from 'react-router-dom';
import { GrTableAdd } from "react-icons/gr";

function ExpenseList({ expenses, onDelete, onEdit }) {
    const redirect = useNavigate();

    const ToAddPage = () => {
        redirect('/add-expense');
      };

    return (
        <table id="expenses">
            <caption>Log of all entered expenses.</caption>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Cost</th>
                    <th>Type</th>
                    <th>Delete</th>
                    <th>Edit</th>
                    <th><GrTableAdd onClick={ToAddPage} /></th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense, i) => 
                    <Expense 
                        expense={expense} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
    );
}

export default ExpenseList;
