import React, { useState, useEffect }  from 'react';
import { useNavigate } from "react-router-dom";

export const EditExpensePage = ({ expenseToEdit }) => {
 
    const [date, setDate]       = useState(expenseToEdit.date.slice(0,10));
    const [name, setName]       = useState(expenseToEdit.name);
    const [cost, setCost]       = useState(expenseToEdit.cost);
    const [expenseType, setExpenseType]       = useState(expenseToEdit.expenseType);
    const [types, setTypes]             = useState([]);
    
    const redirect = useNavigate();

    const editExpense = async () => {
        const response = await fetch(`/expenses/${expenseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                date: date, 
                cost: cost,
                expenseType: expenseType
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert(`Expense has been edited! Status code = ${response.status}.`);
        } else {
            // const errMessage = await response.json();
            alert(`Could not edit expense. Please make sure none of the fields are blank. Status code = ${response.status}.`);
        }
        redirect("/log");
    }

    // Retrieve all expense types
    const loadExpenseTypes = async () => {
        const response = await fetch('/expensetypes');
        const expenseTypes = await response.json();
        setTypes(expenseTypes);
    } 

    // LOAD all the expense types
    useEffect(() => {
        loadExpenseTypes();
    }, []);

    return (
        <>
            <h2>Edit an Expense</h2>
            <article class="info">
                <h3>Info:</h3>
                    <p>Make changes to the desired field(s) below. All fields must be populated before you click the Save button.</p>
            </article>

            <article>
                <form onSubmit={(e) => { e.preventDefault();}}>
                    <fieldset>
                        <legend>Edit an Expense</legend>

                        <label for="date">Date of expense</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)} 
                            id="date" 
                            required
                            />

                        <label for="name">Expense Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} 
                            id="name" 
                            required
                            />

                        <label for="cost">Cost</label>
                        <input
                            type="number"
                            value={cost}
                            onChange={e => setCost(e.target.value)} 
                            id="cost" 
                            required
                            />

                        <label for="type">Expense Type</label>
                        <select name="type" 
                            value={expenseType}
                            onChange={e => {setExpenseType(e.target.value)}}
                            id="type"
                            required
                        >   
                            <option value=""></option>
                            {types.map(({name, budget}) => <option value={name}>{name}</option>)}
                        </select>

                        <label for="submit">
                        <button
                            onClick={editExpense}
                            id="submit"
                        >Save</button></label>
                    </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExpensePage;