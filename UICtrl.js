// UICtrl.js - Handles all UI-related operations

const UISelectors = {
    createBudgetBtn: '#createBudgetBtn',
    budgetName: '#budgetName',
    budgetAmount: '#budgetAmount',
    budgetContainer: '#budget__list',
    addExpenseBtn: '#addExpenseBtn',
    expenseName: '#expenseName',
    expenseAmount: '#expenseAmount',
    budgetSelect: '#budgetSelect',
    expenseTableBody: '#expenseTableBody',
    modalBudgetAmount: '#modalBudgetAmount',
    modalBudgetSpent: '#modalBudgetSpent',
    modalBudgetRemaining: '#modalBudgetRemaining',
    modalExpenseTableBody: '#modalExpenseTableBody',
    editBudgetBtn: '#editBudgetBtn',
    saveBudgetBtn: '#saveBudgetBtn',
    closeBtn: '.close-btn',
    budgetDetailsModal: '#budgetDetailsModal'
};

const UICtrl = {
    getSelectors() {
        return UISelectors;
    },

    getBudgetInput() {
        return {
            name: document.querySelector(UISelectors.budgetName).value,
            amount: parseFloat(document.querySelector(UISelectors.budgetAmount).value)
        };
    },

    getExpenseInput() {
        return {
            name: document.querySelector(UISelectors.expenseName).value,
            amount: parseFloat(document.querySelector(UISelectors.expenseAmount).value),
            budgetId: parseInt(document.querySelector(UISelectors.budgetSelect).value)
        };
    },
    
    displayBudget(budget, openBudgetModal) {
        const budgetElement = document.getElementById(`budget-${budget.id}`);
        const spentPercentage = Math.min((budget.spent / budget.amount) * 100, 100);

        if (budgetElement) {
            budgetElement.querySelector('.spent').textContent = `Spent: $${budget.spent}`;
            budgetElement.querySelector('.remaining').textContent = `Remaining: $${budget.amount - budget.spent}`;
            budgetElement.querySelector('.progress-bar-inner').style.width = `${spentPercentage}%`;
            budgetElement.querySelector('.progress-bar-inner').style.backgroundColor = spentPercentage >= 100 ? 'var(--red)' : 'var(--green)';
        } else {
            const div = document.createElement('div');
            div.classList = 'budget';
            div.id = `budget-${budget.id}`;
            div.innerHTML = `
                <h4>${budget.name}</h4>
                <p>Amount: $${budget.amount}</p>
                <p class="spent">Spent: $${budget.spent}</p>
                <p class="remaining">Remaining: $${budget.amount - budget.spent}</p>
                <div class="progress-bar">
                    <div class="progress-bar-inner" style="width: ${spentPercentage}%"></div>
                </div>
                <button class="view-details-btn" data-id="${budget.id}">View Details</button>
            `;
            document.querySelector(UISelectors.budgetContainer).appendChild(div);

            // Use callback to bind `View Details` button to open modal
            div.querySelector('.view-details-btn').addEventListener('click', function() {
                openBudgetModal(budget.id);
            });
        }
    },

    addExpenseToTable(expense, budgetName) {
        const row = document.createElement('tr');
        row.id = `expense-${expense.id}`;
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount}</td>
            <td>${expense.date}</td>
            <td>${budgetName}</td>
        `;
        document.querySelector(UISelectors.expenseTableBody).appendChild(row);
    },

    deleteExpenseFromTable(expenseId) {
        const expenseRow = document.getElementById(`expense-${expenseId}`);
        if (expenseRow) {
            expenseRow.remove();
        }
    },

    populateModalWithBudget(budget) {
        document.getElementById('modalBudgetName').textContent = budget.name;
        document.querySelector(UISelectors.modalBudgetAmount).value = budget.amount.toFixed(2);
        document.querySelector(UISelectors.modalBudgetSpent).textContent = budget.spent.toFixed(2);
        document.querySelector(UISelectors.modalBudgetRemaining).textContent = (budget.amount - budget.spent).toFixed(2);

        const expenseTableBody = document.querySelector(UISelectors.modalExpenseTableBody);
        expenseTableBody.innerHTML = '';
        budget.expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.id = `modal-expense-${expense.id}`;
            row.innerHTML = `
                <td><input type="text" value="${expense.name}" data-expense-id="${expense.id}" /></td>
                <td><input type="number" value="${expense.amount.toFixed(2)}" data-expense-id="${expense.id}" /></td>
                <td>${expense.date}</td>
                <td><button class="delete-expense-btn" data-expense-id="${expense.id}">Delete</button></td>
            `;
            expenseTableBody.appendChild(row);
        });
        document.querySelector(UISelectors.budgetDetailsModal).style.display = 'flex';
    },

    populateBudgetDropdown(budgets) {
        const dropdown = document.querySelector(UISelectors.budgetSelect);
        dropdown.innerHTML = '<option value="">Select Budget</option>';

        budgets.forEach(budget => {
            const option = document.createElement('option');
            option.value = budget.id;
            option.textContent = budget.name;
            dropdown.appendChild(option);
        });
    },

    clearExpenseInput() {
        document.querySelector(UISelectors.expenseName).value = '';
        document.querySelector(UISelectors.expenseAmount).value = '';
        document.querySelector(UISelectors.budgetSelect).value = '';
    },

    toggleModalEditMode(isEditing) {
        document.querySelector(UISelectors.modalBudgetAmount).disabled = !isEditing;
        const expenseInputs = document.querySelectorAll(`${UISelectors.modalExpenseTableBody} input`);
        expenseInputs.forEach(input => input.disabled = !isEditing);
        document.querySelector(UISelectors.editBudgetBtn).classList.toggle('hidden', isEditing);
        document.querySelector(UISelectors.saveBudgetBtn).classList.toggle('hidden', !isEditing);
    },

    closeModal() {
        document.querySelector(UISelectors.budgetDetailsModal).style.display = 'none';
    }
};

export default UICtrl;
