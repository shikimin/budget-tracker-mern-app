# Budget Tracker

Created with **MongoDB** || **Express.js** || **React.js** || **Node.js**

:bangbang:**See the working version [here](https://shikimin-budget-tracker.netlify.app/)!**:bangbang:

## About
A simple budget tracker app created with the MERN stack. Features include:

* Expense Log
  * Shows the last 30 entries made
  * Can add or delete expenses
* Ability to edit expense types
  * Default expense types can be deleted or edited, new expense types can be added
* Search expenses by desired criteria
* View spending levels for each expense type for the current month

## How to Use
#### Prerequisites
* MongoDB Atlas Database

#### 1. Clone or download repo
```
git clone https://github.com/shikimin/budget-tracker-mern-app.git
cd budget-tracker-mern-app
```
#### 2. Create an .env file in backend folder and add the following:
```
MONGODB_CONNECT_STRING="<your connection string>" 
PORT=3000
```
#### 3. Create an .env file in frontend folder and add the following:
```
PORT=8000
```
#### 4. Start backend
```
cd backend
npm install
npm start
```
#### 5. Start frontend
```
cd frontend
npm install
npm start
```
