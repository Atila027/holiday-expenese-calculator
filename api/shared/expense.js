'use strict';

const _ = require('lodash');
const money = require('./money');

/**
 * @class Expense
 * @author Tomas Atila <atila423027@gmail.com>
 */
class Expense {
    constructor(name, amount) {
        this.name = name;
        this.amount = parseFloat(amount);

        if (!this.name || typeof this.name !== 'string') throw new Error('Invalid name in Expense!');
        if (!this.amount || typeof this.amount !== 'number') throw new Error('Invalid amount in Expense!');
    }

    /**
     * Adds amount to existing instance amount
     * @param {number} amount
     */
    addAmount(amount) {
        this.amount = money.sumAmount(this.amount, amount);
    }

    /**
     * Calculate totals - total sum, equal shares, and sum of expenses for each person
     * @param {Array<Expense>} expenses
     * @returns {{total: number, equalShare: number, people: []}}
     */
    static sumExpenses(expenses) {
        let total = 0;
        const people = [];
        // Sum each expense per person, and sum of all expenses:
        _.each(expenses, expense => {
            total = money.sumAmount(total, expense.amount);
            const person = _.find(people, { name: expense.name });
            if (!person) {
                // Person does not exist yet, create item:
                people.push(new Expense(expense.name, money.sumAmount(0, expense.amount)));
            } else {
                person.addAmount(expense.amount);
            }
        });
        const equalShare = money.parseAmount(total / people.length);
        return { total: total, people, equalShare };
    }
}

module.exports = Expense;