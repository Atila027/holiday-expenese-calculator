'use strict';

const _ = require('lodash');
const chai = require('chai');
const expect = _.get(chai, 'expect');

const Payout = require('../../shared/payout');

describe('Payout', () => {
    const payout = new Payout('Erik', 'Nobody', 1000);
    const expenses = {
        total: 217.18,
        people: [
            { name: 'Adriana', amount: 53.54 },
            { name: 'Bao', amount: 50.23 },
            { name: 'Camden', amount: 113.41 }
        ],
        equalShare: 72.39
    }

    describe('new Payout', () => {
        it('creates an instance of Payout', () => {
            expect(payout instanceof Payout);
        });
    });

    describe('Payout.calculateOwed', () => {
        const amounts = Payout.calculateOwed(expenses.people, expenses.equalShare);

        it('calculates who owes correctly', () => {
            expect(_.find(amounts, { name: 'Adriana'}).owes).toBe(18.85);
        });

       it('calculates who is owed correctly', () => {
           expect(_.find(amounts, { name: 'Camden'}).owed).toBe(41.02);
       });
    });

    describe('Payout.calculatePayouts', () => {
        const people = Payout.calculateOwed(expenses.people, expenses.equalShare);
        const payouts = Payout.calculatePayouts(people);

        it('returns an array of Payout instances', () => {
            expect(payouts[0] instanceof Payout).toBe(true);
        });

        it('calculates payouts correctly', () => {
           expect(payouts[0].amount).toBe(18.85);
           expect(payouts[1].amount).toBe(22.16);
        });
    });
});