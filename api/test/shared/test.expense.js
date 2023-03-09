'use strict';

const _ = require('lodash');
const chai = require('chai');
const expect = _.get(chai, 'expect');

const Expense = require('../../shared/expense');

// Test example data:
const expenses = [
    new Expense('Adriana', 5.75),
    new Expense('Adriana', 35.00),
    new Expense('Adriana', 12.79),
    new Expense('Bao', 12.00),
    new Expense('Bao', 15.00),
    new Expense('Bao', 23.23),
    new Expense('Camden', 10),
    new Expense('Camden', 20),
    new Expense('Camden', 38.41),
    new Expense('Camden', 45)
];

describe('Expense', () => {
    const expense = new Expense('Erik', 23.45);
    describe('new Expense', () => {
        it('creates an instance of Expense', () => {
            expect(expense instanceof Expense).toBe(true);
        });
    });

    describe('expense.addAmount', () => {
       it('adds amount correctly', () => {
           expense.addAmount(5);
           expect(expense.amount).toBe(28.45);
       });
    });

    describe('Expense.sumExpenses', () => {
        it('is a Function', () => {
            expect(Expense.sumExpenses).toBeInstanceOf(Function);
        });

        const summed = Expense.sumExpenses(expenses);

        it('sums total correctly ($217.18)', () => {
            expect(summed.total).toBe(217.18);
        });

        it('sums a person (Adriana) for expenses correctly ($53.54)', () => {
            expect(_.find(summed.people, { name: 'Adriana' }).amount).toBe(53.54);
        });
    });
});