const usernameInput = document.getElementById('username');
const password = document.getElementById('password');
const currentUserSpan = document.getElementById('current-user');
const financeDashboard = document.getElementById('finance-dashboard');
const transactionForm = document.getElementById('transaction-form');
const textSelect = document.getElementById('text');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');
const totalIncomeSpan = document.getElementById('total-income');
const totalExpensesSpan = document.getElementById('total-expenses');
const balanceSpan = document.getElementById('balance');

let currentUser = null;
let usersData = {}; // Stores all users' data

// Load data from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('financeTrackerData');
    if (storedData) {
        usersData = JSON.parse(storedData);
    }
});

function saveUserData() {
    localStorage.setItem('financeTrackerData', JSON.stringify(usersData));
}

function switchUser() {
    const username = prompt("enter member name").trim();
    if (username) {
        currentUser = username;
        currentUserSpan.textContent = currentUser;
        financeDashboard.style.display = 'block';
        loadTransactions();
    } else {
        alert('Please enter a username.');
    }
}

function newUser() {
    const username = prompt('Enter new username:').trim();
    if (username && !usersData[username]) {
        usersData[username] = { transactions: [] };
        currentUser = username;
        currentUserSpan.textContent = currentUser;
        financeDashboard.style.display = 'block';
        loadTransactions();
        saveUserData();
    } else if (username && usersData[username]) {
        alert('User already exists. Please choose a different username or switch to existing user.');
    }
}

function loadTransactions() {
    transactionList.innerHTML = '';
    let totalIncome = 0;
    let totalExpenses = 0;

    if (usersData[currentUser] && usersData[currentUser].transactions) {
        usersData[currentUser].transactions.forEach((transaction, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${transaction.text} : Ksh.${transaction.amount.toFixed(2)}</span>
            `;
            transactionList.appendChild(listItem);

            if (transaction.type === 'income') {
                totalIncome += transaction.amount;
            } else {
                totalExpenses += transaction.amount;
            }
        });
    }

    totalIncomeSpan.textContent = totalIncome.toFixed(2);
    totalExpensesSpan.textContent = totalExpenses.toFixed(2);
    balanceSpan.textContent = (totalIncome - totalExpenses).toFixed(2);
}

addEventListener('submit', (e) => {
    e.preventDefault();

    if (!currentUser) {
        alert('Please select or create a user first.');
        return;
    }

    const text = textSelect.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (text && !isNaN(amount) && amount > 0) {
        const newTransaction = { text, amount, type };
        if (!usersData[currentUser]) {
            usersData[currentUser] = { transactions: [] };
        }
        usersData[currentUser].transactions.push(newTransaction);
        saveUserData();
        loadTransactions();
        textSelect.value = '';
        amountInput.value = '';
    } else {
        alert('Please enter valid transaction details.');
    }
});

function deleteTransaction(username, index) {
    if (usersData[username] && usersData[username].transactions) {
        usersData[username].transactions.splice(index, 1);
        saveUserData();
        loadTransactions();
    }
}