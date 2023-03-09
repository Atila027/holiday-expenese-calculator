const express = require('express');
const router = express.Router();
const _ = require('lodash');
const createError = require('http-errors');

const Expense = require('../shared/expense');
const Payout = require('../shared/payout');

/**
 * POST /payouts
 * @author Tomas Atila <atila423027@gmail.com>
 */
router.post('/', async (request, response, next) => {
    try {
        const expenses = _.map(_.get(request, 'body.expenses'), expense => {
            return new Expense(expense.name, expense.amount)
        });
        if (!expenses || expenses.length < 2) {
            return next(createError(400, { message: 'Invalid list of expenses.' }));
        }

        const summed = Expense.sumExpenses(expenses);
        const owed = Payout.calculateOwed(summed.people, summed.equalShare);
        const payouts = Payout.calculatePayouts(owed);

        return response.json({
            total: summed.total,
            equalShare: summed.equalShare,
            payouts
        });
    } catch (error) {
        console.log(error);
        return next({
           status: 500,
           message: 'Internal Server Error'
        });
    }
});

module.exports = router;
