import React from 'react';

function HomePage() {
    return (
        <>
            <h2>Welcome!</h2>
            <article class="info">
                <p>Welcome to my budget tracker app!</p>
                
                <p>Click on <strong>Expense Log</strong> to view pre-populated expenses and expense types. Feel free to edit or delete these expenses.</p>
                <p>Click on <strong>Configure</strong> to view and edit expense types.</p>
                <p>Click on <strong>Stats</strong> to see current cost vs. budget stats.</p>
                <p>Click on <strong>Search</strong> to look up expenses based on certain criteria.</p>
            </article>
         </>
    );
}

export default HomePage;