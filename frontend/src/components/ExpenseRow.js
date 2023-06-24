import React from 'react';
import { TiDeleteOutline, TiPencil } from 'react-icons/ti';

function Expense({ expense, onEdit, onDelete }) {
    const convertedCost = expense.cost.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,

    });

    return (
        <tr>
            <td>{expense.date.slice(0,10)}</td>
            <td>{expense.name}</td>
            <td>{convertedCost}</td>
            <td>{expense.expenseType}</td>
            <td><TiDeleteOutline onClick={() => onDelete(expense._id)} /></td>
            <td><TiPencil onClick={() => onEdit(expense)} /></td>
            <td></td>
        </tr>
    );
}

export default Expense;