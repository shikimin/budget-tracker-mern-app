import { React, useState, useEffect } from 'react';

export const SearchPage = () => {

    const [fromDate, setFromDate]               = useState('');
    const [untilDate, setUntilDate]             = useState('');
    const [name, setName]                       = useState('');
    const [fromCost, setFromCost]               = useState('');
    const [untilCost, setUntilCost]             = useState('');
    const [expenseType, setExpenseType]         = useState('');
    const [types, setTypes]                     = useState([]);
    const [expenses, setExpenses]               = useState([]);
    const [results, setResults]                 = useState([]);
    
    // RETRIEVE expenses
    const loadExpenses = async () => {
        const response = await fetch('/expenses/0');
        const expenses = await response.json();
        setExpenses(expenses);
    } 

    // Retrieve all expense types
    const loadExpenseTypes = async () => {
        const response = await fetch('/expensetypes');
        const expenseTypes = await response.json();
        setTypes(expenseTypes);
    } 

    const convertedCost = (num) => {
        return num.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    };
    
    function filterDate(expense) {
        const from = new Date(fromDate);
        const until = new Date(untilDate);
        const now = new Date(expense.date);
        
        if (from <= now && now <= until)
        {
            return true;
        } 
    };

    function sortResults(arr) {
        arr.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA < dateB) {
                return -1;
            }
            if (dateA > dateB) {
                return 1;
            }
            return 0;
        });
    }

    const searchExpenses = () => {
        if (fromDate !== '' && untilDate === '') {
            alert("Please either populate both date fields or leave them blank.")
            return
        };

        if (fromDate === '' && untilDate !== '') {
            alert("Please either populate both date fields or leave them blank.")
            return
        };

        if (fromCost !== '' && untilCost === '') {
            alert("Please either populate both cost fields or leave them blank.")
            return
        };

        if (fromCost === '' && untilCost !== '') {
            alert("Please either populate both cost fields or leave them blank.")
            return
        };
        
        let resultArray = [...expenses];

        if (fromDate !== '' && untilDate !== '') {
            resultArray = resultArray.filter(filterDate)
        };

        if (name !== '') {
            resultArray = resultArray.filter(expense => expense.name.toLowerCase() === name.toLowerCase())
        };

        if (fromCost !== '' && untilCost !== '') {
            resultArray = resultArray.filter(expense => fromCost <= expense.cost && expense.cost <= untilCost)
        };

        if (expenseType !== '') {
            resultArray = resultArray.filter(expense => expense.expenseType === expenseType)
        };
        sortResults(resultArray);
        setResults(resultArray);
    };

    // LOAD all the expenses
    useEffect(() => {
        loadExpenses();
        loadExpenseTypes();
    }, []);

    return (
        <>
            <h2>Search for Expenses</h2>
            <article className="info">
                <h3>Info:</h3>
                <p>Fill out the fields below to add an entry to the log. All fields must be populated before you click the Add button.</p>
            </article>

            <article className="searchContainer">
                <form id="searchForm" onSubmit={(e) => { e.preventDefault();}}>
                    <fieldset>
                        <legend>Search for Expenses</legend>

                        <label htmlFor="date">Date of expense</label>
                        <input
                            type="date"
                            value={fromDate}
                            placeholder="Date of expense"
                            onChange={e => setFromDate(e.target.value)} 
                            id="date" 
                            />

                        <label htmlFor="untildate">Date of expense</label>
                        <input
                            type="date"
                            value={untilDate}
                            placeholder="Date of expense"
                            onChange={e => setUntilDate(e.target.value)} 
                            id="date" 
                            />

                        <label htmlFor="name">Expense name</label>
                        <input
                            type="text"
                            placeholder="Name of the expense"
                            value={name}
                            onChange={e => setName(e.target.value)} 
                            id="name" 
                            />

                        <label htmlFor="cost">From Cost</label>
                        <input
                            type="number"
                            placeholder="Cost"
                            value={fromCost}
                            onChange={e => setFromCost(e.target.value)} 
                            id="cost" 
                            />

                        <label htmlFor="cost">Until Cost</label>
                        <input
                            type="number"
                            placeholder="Cost"
                            value={untilCost}
                            onChange={e => setUntilCost(e.target.value)} 
                            id="cost" 
                            />

                        <label htmlFor="type">Expense Type</label>
                        <select name="type" 
                            value={expenseType}
                            onChange={e => {setExpenseType(e.target.value)}}
                            id="type"
                        >   
                            <option value=""></option>
                            {types.map(({name, budget}, i) => <option value={name} key={i}>{name}</option>)}
                        </select>

                        <label htmlFor="submit">
                        <button
                            type="submit"
                            onClick={searchExpenses}
                            id="submit"
                        >Search</button></label>
                    </fieldset>
                </form>
                
                <table>
                    <caption>Log of all entered expenses.</caption>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((results, i) => {
                            return <tr key={i}>
                                <td>{results.date.slice(0,10)}</td>
                                <td>{results.name}</td>
                                <td>{convertedCost(results.cost)}</td>
                                <td>{results.expenseType}</td>
                        </tr>
                        })}
                    </tbody>
                </table>
            </article>
        </>
    );
}

export default SearchPage;