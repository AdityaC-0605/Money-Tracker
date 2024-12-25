const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const balanceElement = document.getElementById('balance');

let transactions = [];

// Fetch transactions from the server
async function fetchTransactions() {
    const response = await fetch('/api/transactions');
    transactions = await response.json();
    updateTransactionList();
    updateBalance();
}

// Add a new transaction
async function addTransaction(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, amount, type }),
    });

    const newTransaction = await response.json();
    transactions.unshift(newTransaction);

    updateTransactionList();
    updateBalance();
    transactionForm.reset();
}

// Update the transaction list in the UI
function updateTransactionList() {
    transactionList.innerHTML = '';
    transactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>$${transaction.amount.toFixed(2)}</span>
        `;
        transactionList.appendChild(li);
    });
}

// Update the balance in the UI
function updateBalance() {
    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income'
            ? acc + transaction.amount
            : acc - transaction.amount;
    }, 0);
    balanceElement.textContent = balance.toFixed(2);
}

transactionForm.addEventListener('submit', addTransaction);
fetchTransactions();