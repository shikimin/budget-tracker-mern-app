import { React, useState, useEffect } from 'react';
import ProgressBar from '../components/ProgressBar';


export const StatsPage = () => {

    const [filteredExpenses, setFilteredExpenses]               = useState('');
    const [stats, setStats]                                     = useState([]);

    function currentStats(expenseType, cost, budget) {
        this.expenseType = expenseType;
        this.cost = cost;
        this.budget = budget;
    };

    let currentStatsArray = [];
    const month = new Date().toLocaleString('default', { month: 'long' });;

    const getTotals = () => {
        for (let object of filteredExpenses) {
            let stats = new currentStats();

            stats.expenseType = object._id;
            stats.cost = object.total;
            stats.budget = object.budget;
            currentStatsArray.push(stats);
            setStats(currentStatsArray)
        }
    };

    // RETRIEVE the filtered expenses
    const loadExpenses = async () => {
        const response = await fetch('/expensestats');
        const expenses = await response.json();
        setFilteredExpenses(expenses);
        getTotals();
    } 
        
    // LOAD all the expenses
    useEffect(() => {
        loadExpenses();
    }, []);

    useEffect(() => {
        getTotals();
    }, [filteredExpenses]);

    const tot = () => {
        let grandTotal = 0;
        let grandBudgetTotal = 0;
        stats.forEach(element => {
            grandTotal += element.cost;
            grandBudgetTotal += element.budget;
        });
        return [grandTotal, grandBudgetTotal];
        };

    const [totalCost, totalBudget] = tot();

    return ( 
        <>
            <h2>Current Month's Stats: {month}</h2>
            <article className="info">
                <h3>Info:</h3>
                <p>The progress rings below depict how much you have spent in each category this month vs. your declared monthly budget for each expense type.</p>
            </article>

            <div id="progressContainerMain">
                <ProgressBar
                        text={"Grand Total"} 
                        cost={totalCost}
                        budget={totalBudget}
                />
            </div>
            <div id="progressContainer">
                {stats.map((stat, i) => 
                    <ProgressBar
                        text={stat.expenseType} 
                        cost={stat.cost}
                        budget={stat.budget} 
                        key={i}
                    />)}
            </div>

        </>
    );
}

export default StatsPage;