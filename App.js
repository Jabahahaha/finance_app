// App.js

import itemCtrl from './itemCtrl.js';
import UICtrl from './UICtrl.js';

const App = (function(itemCtrl, UICtrl) {
    const UISelectors = UICtrl.getSelectors();

    const loadEventListeners = function() {
        document.querySelector(UISelectors.createBudgetBtn).addEventListener('click', createBudget);
        document.querySelector(UISelectors.addExpenseBtn).addEventListener('click', addExpense);
        document.querySelector(UISelectors.closeBtn).addEventListener('click', UICtrl.closeModal);

        document.querySelector(UISelectors.editBudgetBtn).addEventListener('click', () => UICtrl.toggleModalEditMode(true));
        document.querySelector(UISelectors.saveBudgetBtn).addEventListener('click', saveBudgetChanges);

        // Event delegation for delete buttons in modal
        document.querySelector(UISelectors.modalExpenseTableBody).addEventListener('click', function(e) {
            if (e.target.classList.contains('delete-expense-btn')) {
                const budgetId = parseInt(document.querySelector(UISelectors.budgetDetailsModal).dataset.budgetId);
                const expenseId = parseInt(e.target.dataset.expenseId);
                deleteExpense(budgetId, expenseId);
            }
        });
    };

    const createBudget = function() {
        const input = UICtrl.getBudgetInput();
        if (input.name && !isNaN(input.amount) && input.amount > 0) {
            const newBudget = itemCtrl.addBudget(input.name, parseFloat(input.amount));
            UICtrl.displayBudget(newBudget, openBudgetModal);
            UICtrl.populateBudgetDropdown(itemCtrl.getBudgets());
            document.querySelector(UISelectors.budgetName).value = '';
            document.querySelector(UISelectors.budgetAmount).value = '';
            console.log("Budget created:", newBudget);
        } else {
            console.error("Invalid budget input: name and positive amount required.");
        }
    };

    const addExpense = function() {
        const input = UICtrl.getExpenseInput();
        if (input.name && input.amount > 0 && input.budgetId) {
            const { budget, expense } = itemCtrl.addExpense(input.budgetId, input.name, input.amount);
            UICtrl.displayBudget(budget, openBudgetModal);
            UICtrl.addExpenseToTable(expense, budget.name);
            UICtrl.clearExpenseInput();
            console.log("Expense added:", expense);
        } else {
            console.error("Invalid expense input: name, positive amount, and valid budget selection required.");
        }
    };

    const saveBudgetChanges = function() {
        const budgetName = document.getElementById('modalBudgetName').textContent;
        const newAmount = parseFloat(document.querySelector(UISelectors.modalBudgetAmount).value);
        const budget = itemCtrl.getBudgets().find(b => b.name === budgetName);

        if (budget) {
            budget.amount = newAmount;
            const expenseRows = document.querySelectorAll(`${UISelectors.modalExpenseTableBody} tr`);
            budget.spent = 0;
            expenseRows.forEach(row => {
                const expenseId = parseInt(row.querySelector('input[type="text"]').dataset.expenseId);
                const updatedName = row.querySelector('input[type="text"]').value;
                const updatedAmount = parseFloat(row.querySelector('input[type="number"]').value);
                const expense = budget.expenses.find(exp => exp.id === expenseId);
                if (expense) {
                    expense.name = updatedName;
                    expense.amount = updatedAmount;
                    budget.spent += updatedAmount;
                }
            });
            UICtrl.displayBudget(budget, openBudgetModal);
            UICtrl.populateModalWithBudget(budget);
            UICtrl.closeModal();
            UICtrl.toggleModalEditMode(false);
            console.log("Budget changes saved:", budget);
        } else {
            console.error("Budget not found or invalid changes.");
        }
    };

    const deleteExpense = function(budgetId, expenseId) {
        const budget = itemCtrl.deleteExpense(budgetId, expenseId);
        if (budget) {
            UICtrl.populateModalWithBudget(budget);
            UICtrl.displayBudget(budget, openBudgetModal);
            UICtrl.deleteExpenseFromTable(expenseId);
            console.log(`Expense with ID ${expenseId} deleted from budget ID ${budgetId}`);
        } else {
            console.error("Failed to delete expense: Budget or expense not found.");
        }
    };

    const openBudgetModal = function(budgetId) {
        const budget = itemCtrl.getBudgets().find(b => b.id === budgetId);
        if (budget) {
            document.querySelector(UISelectors.budgetDetailsModal).dataset.budgetId = budget.id;
            UICtrl.populateModalWithBudget(budget);
            console.log("Budget modal opened for:", budget);
        } else {
            console.error("Budget not found for modal view.");
        }
    };

    return {
        init: function() {
            loadEventListeners();
            UICtrl.populateBudgetDropdown(itemCtrl.getBudgets());
            console.log("App initialized and budget dropdown populated.");
        },
        openBudgetModal,
        deleteExpense
    };
})(itemCtrl, UICtrl);

export default App;
