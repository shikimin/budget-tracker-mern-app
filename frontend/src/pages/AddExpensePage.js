import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const AddExpensePage = () => {

    const [date, setDate]               = useState('');
    const [name, setName]               = useState('');
    const [cost, setCost]               = useState('');
    const [expenseType, setExpenseType]        = useState('');
    const [types, setTypes]             = useState([]);
    
    const redirect = useNavigate();

    const addExpense = async () => {
        const newExpense = { name, date, cost, expenseType };
        const response = await fetch('/expenses', {
            method: 'post',
            body: JSON.stringify(newExpense),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`Expense has been added! Status code = ${response.status}.`);
            redirect("/log");
        } else {
            alert(`Could not add expense. Please make sure none of the fields are blank. Status code = ${response.status}`);
        }
    };

    // Retrieve all expense types
    const loadExpenseTypes = async () => {
        const response = await fetch('/expensetypes');
        const expenseTypes = await response.json();
        setTypes(expenseTypes);
    } 


    // LOAD all the expenses
    useEffect(() => {
        loadExpenseTypes();
    }, []);


    return (
        <>
            <h2>Add an Expense</h2>
            <article className="info">
                <h3>Info:</h3>
                <p>Fill out the fields below to add an entry to the log. All fields must be populated before you click the Add button.</p>
            </article>

            <article>
                <form onSubmit={(e) => { e.preventDefault();}}>
                    <fieldset>
                        <legend>Add an Expense</legend>

                        <label htmlFor="date">Date of expense</label>
                        <input
                            type="date"
                            value={date}
                            placeholder="Date of expense"
                            onChange={e => setDate(e.target.value)} 
                            id="date" 
                            required/>

                        <label htmlFor="name">Expense name</label>
                        <input
                            type="text"
                            placeholder="Name of the expense"
                            value={name}
                            onChange={e => setName(e.target.value)} 
                            id="name" 
                            required/>

                        <label htmlFor="cost">Cost</label>
                        <input
                            type="number"
                            placeholder="Cost"
                            value={cost}
                            onChange={e => setCost(e.target.value)} 
                            id="cost" 
                            required/>

                        <label htmlFor="type">Expense Type</label>
                        <select name="type" 
                            value={expenseType}
                            onChange={e => {setExpenseType(e.target.value)}}
                            id="type"
                            required
                        >   
                            <option value=""></option>
                            {types.map(({name, budget}, i) => <option value={name} key={i}>{name}</option>)}
                        </select>

                        <label htmlFor="submit">
                        <button
                            type="submit"
                            onClick={addExpense}
                            id="submit"
                        >Add</button></label>
                    </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddExpensePage;