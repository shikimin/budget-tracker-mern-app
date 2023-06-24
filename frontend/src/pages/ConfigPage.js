import { React, useState, useEffect } from 'react';

export const ConfigPage = () => {
    const [types, setTypes]     = useState([]);
    const [expenseType, setExpenseType]       = useState("");
    const [name, setName]       = useState("");
    const [budget, setBudget]   = useState("");

    const getBudget = (selectedType) => {
        types.forEach((obj) => {
            if (obj.name === selectedType) {
                setBudget(obj.budget);
                setExpenseType(obj);
            }
        })
    };

    // Retrieve all expense types
    const loadExpenseTypes = async () => {
        const response = await fetch('/expensetypes');
        const expenseTypes = await response.json();
        setTypes(expenseTypes);
    } 

    // Add new expense type to database
    const addExpenseType = async () => {
        const newExpenseType = { name, budget };
        const response = await fetch('/expensetypes', {
            method: 'post',
            body: JSON.stringify(newExpenseType),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`Expense has been added! Status code = ${response.status}.`);
            loadExpenseTypes();
            setName("");
            setBudget("");
        } else {
            alert(`Could not add expense. Please make sure none of the fields are blank. Status code = ${response.status}`);
        };

    };
    
    // Update a single expense type
    const editExpenseType = async () => {
        const response = await fetch(`/expensetypes/${expenseType._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                budget: budget
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert(`Expense has been edited! Status code = ${response.status}.`);
            loadExpenseTypes();
        } else {
            alert(`Could not edit expense type. Please make sure none of the fields are blank. Status code = ${response.status}.`);
        }

    }

    // DELETE a single expense  
    const deleteExpenseType = async () => {
        const response = await fetch(`/expensetypes/${expenseType._id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/expensetypes');
            const expenseTypes = await getResponse.json();
            setTypes(expenseTypes);
            alert(`Expense type has been deleted`);
            setName("");
            setBudget("");
            loadExpenseTypes();
        } else {
            alert(`Could not delete expense type.`);
        }

    }

    // LOAD all the expenses
    useEffect(() => {
        loadExpenseTypes();
    }, []);
        
    return (
        <>
        <h2>Edit Expense Types</h2>
            <article class="info">
                <h3>Info:</h3>
                <p><strong>Add</strong> an expense type by filling in the Expense Name and Monthly Budget fields and clicking Add.</p>
                <p><strong>Edit</strong> an expense type by selecting one from the drop down menu, entering the desired change(s) in the Expense Name and/or Monthly Budget fields, and clicking Update.</p>
                <p><strong>Delete</strong> an expense type by selecting from the drop down menu and clicking Delete.</p>
                <p>Note: An expense type's monthly budget is how much you should and/or are willing to spend on a type of expense in the span of one month.</p>
            </article>

            <article>
                <form onSubmit={(e) => { e.preventDefault();}}>

                <fieldset>
                <legend>Edit Expense Type</legend>

                    <label htmlFor="type">Type of expense</label>
                    <select name="type" 
                        onChange={e => {setName(e.target.value); getBudget(e.target.value)}}
                        id="type"
                    >   
                        <option value=""></option>
                        {types.map(({name, budget}, i) => <option value={name} key={i}>{name}</option>)}
                    </select>

                    <table>
                        <thead>
                            <tr>
                                <th><label htmlFor="name">Expense Name</label></th>
                                <th><label htmlFor="budget">Monthly Budget</label></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                type="text"
                                placeholder="Name of the expense"
                                value={name}
                                onChange={e => setName(e.target.value)} 
                                id="name" 
                                required/>
                                </td>

                                <td>
                                    <input
                                    type="number"
                                    placeholder={budget}
                                    value={budget}
                                    onChange={e => setBudget(e.target.value)} 
                                    id="budget" 
                                    required/>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div id="configButtonContainer">
                        <button
                            type="submit"
                            onClick={addExpenseType}
                            id="configSubmit"
                        >Add</button>

                        <button
                            type="submit"
                            onClick={editExpenseType}
                            id="configSubmit"
                        >Update</button>

                        <button
                            type="submit"
                            onClick={deleteExpenseType}
                            id="configSubmit"
                        >Delete</button>
                    </div>
                </fieldset>
                </form>
            </article>
        </>

    );
}
export default ConfigPage;