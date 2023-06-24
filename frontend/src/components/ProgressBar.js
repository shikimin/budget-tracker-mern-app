import { React } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProgressBar({ text, cost, budget }) {

    const convertedCost = (num) => {
        return num.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    };
    
    return (
        <>
        <div id="progress">
            <CircularProgressbar value={ cost/budget * 100 } text={ `${ (cost/budget * 100).toFixed(2) }%` } />

            <div id="progressTextBox">
                <p id="progressTextHeader"><strong>{text}</strong></p>
                <p id="progressText"><u>$ Spent</u>: {convertedCost(cost)}</p>
                <p id="progressText"><u>Budget</u>: {convertedCost(budget)}</p>
                <p id="progressText"><u>$ Saved</u>: {convertedCost(budget - cost)}</p>
            </div>
        </div>
        </>

    );
}

export default ProgressBar;