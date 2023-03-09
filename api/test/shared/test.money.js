'use strict';

const _ = require('lodash');
const chai = require('chai');
const expect = _.get(chai, 'expect');

const Money = require('../../shared/money');

describe('Money', () => {
    describe('Money.parseAmount', () => {
        it('parses amount to two decimal places for money', () => {
            expect(Money.parseAmount(25.44444444)).toBe(25.44);
            expect(Money.parseAmount(25.9999)).toBe(26.00);
        });
    });

    describe('Money.sumAmount', () => {
        it('sums two amounts of money correctly ($25.50)', () => {
            expect(Money.sumAmount(25.49, 0.0101)).toBe(25.50);
        });
    });
});