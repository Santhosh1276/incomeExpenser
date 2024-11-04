let entries = [];
let currentIndex = null;

const entryList = document.getElementById('entryList');
const totalIncomeDisplay = document.getElementById('totalIncome');
const totalExpensesDisplay = document.getElementById('totalExpenses');
const netBalanceDisplay = document.getElementById('netBalance');

document.getElementById('addBtn').addEventListener('click', addEntry);
document.getElementById('resetBtn').addEventListener('click', resetFields);

function addEntry() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (!description || isNaN(amount)) return;

    if (currentIndex !== null) {
        entries[currentIndex] = { description, amount, type };
        currentIndex = null;
    } else {
        entries.push({ description, amount, type });
    }

    resetFields();
    displayEntries();
}

function displayEntries() {
    entryList.innerHTML = '';
    let totalIncome = 0;
    let totalExpenses = 0;

    entries.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${entry.description} - ₹ ${entry.amount.toFixed(2)}
            <div class="button-container">
                <button class="editBtn" onclick="editEntry(${index})">Edit</button>
                <button class="deleteBtn" onclick="deleteEntry(${index})">Delete</button>
            </div>
        `;

        entryList.appendChild(li);

        if (entry.type === 'income') {
            totalIncome += entry.amount;
        } else {
            console.log("inside this >>>>",entry)
            totalExpenses += entry.amount;
        }
    });

    totalIncomeDisplay.textContent = totalIncome.toFixed(2);
    totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
    netBalanceDisplay.textContent = (totalIncome - totalExpenses).toFixed(2);
}

function editEntry(index) {
    currentIndex = index;
    const entry = entries[index];
    document.getElementById('description').value = entry.description;
    document.getElementById('amount').value = entry.amount;
    document.getElementById('type').value = entry.type;
}

function deleteEntry(index) {
    entries.splice(index, 1);
    displayEntries();
}

function resetFields() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('type').value = 'income';
}
