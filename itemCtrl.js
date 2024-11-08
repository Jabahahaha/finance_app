// itemCtrl.js - Manages budgets and expenses

const itemCtrl = (function() {
    // Budget constructor
    const Budget = function(id, name, amount, spent = 0, expenses = []) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.spent = spent;
        this.expenses = expenses;
    };

    // Expense constructor
    const Expense = function(id, name, amount, date) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.date = date;
    };

    // Data structure for storing budgets and expenses
    const data = {
        budgets: []
    };

    return {
        addBudget: function(name, amount) {
            const id = this.createID();
            const newBudget = new Budget(id, name, amount);
            data.budgets.push(newBudget);
            return newBudget;
        },

        addExpense: function(budgetId, expenseName, expenseAmount) {
            const budget = data.budgets.find(b => b.id === budgetId);
            if (budget) {
                const expense = new Expense(this.createID(), expenseName, expenseAmount, new Date().toLocaleDateString());
                budget.spent += expenseAmount;
                budget.expenses.push(expense);
                return { budget, expense };
            }
            return null; // return null if no matching budget is found
        },

        deleteExpense: function(budgetId, expenseId) {
            const budget = data.budgets.find(b => b.id === budgetId);
            if (budget) {
                const expenseIndex = budget.expenses.findIndex(exp => exp.id === expenseId);
                if (expenseIndex !== -1) {
                    // Deduct the expense amount from the total spent in the budget
                    budget.spent -= budget.expenses[expenseIndex].amount;
                    // Remove the expense from the budget's expenses array
                    budget.expenses.splice(expenseIndex, 1);
                    return budget; // Return the updated budget object
                }
            }
            return null; // return null if deletion was not successful
        },

        getBudgets: function() {
            return data.budgets;
        },

        createID: function() {
            return Math.floor(Math.random() * 10000);
        }
    };
})();

export default itemCtrl;
