import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';


//import components and pages
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import LogPage from './pages/LogPage';
import AddExpensePage from './pages/AddExpensePage';
import EditExpensePage from './pages/EditExpensePage';
import ConfigPage from './pages/ConfigPage';
import StatsPage from './pages/StatsPage';
import SearchPage from './pages/SearchPage';

import './App.css';

function App() {

  const [expense, setExpense] = useState([])

  return (
    <div className="App">
      <BrowserRouter>

        <header className="App-header">
          <h1>Budget Tracker</h1>
        </header>

        <Nav />

        <main>
          <section>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/log" element={<LogPage setExpense={setExpense} />} />
                <Route path="/add-expense" element={<AddExpensePage />} />
                <Route path="/edit-expense" element={<EditExpensePage expenseToEdit={expense} />} />
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
          </section>
        </main>
        
        <footer>
          <p>&copy; 2023 Minyoung Shin</p>
        </footer>
        
        </BrowserRouter>
      </div>
    );
  }

export default App;
