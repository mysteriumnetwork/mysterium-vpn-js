"use strict";
/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var quality_calculator_1 = require("../../domain/quality-calculator");
var quality_level_1 = require("../../models/quality-level");
describe('QualityCalculator', function () {
    var qualityCalculator;
    beforeEach(function () {
        qualityCalculator = new quality_calculator_1.QualityCalculator();
    });
    describe('.calculateValue', function () {
        it('returns 1 for successful metrics', function () {
            var metrics = { connectCount: { success: 1, fail: 0, timeout: 0 } };
            expect(qualityCalculator.calculateValue(metrics)).toEqual(1);
        });
        it('returns 0 for failure metrics', function () {
            var metrics1 = { connectCount: { success: 0, fail: 1, timeout: 0 } };
            expect(qualityCalculator.calculateValue(metrics1)).toEqual(0);
            var metrics2 = { connectCount: { success: 0, fail: 0, timeout: 1 } };
            expect(qualityCalculator.calculateValue(metrics2)).toEqual(0);
        });
        it('returns null when all metrics are zero', function () {
            var metrics1 = { connectCount: { success: 0, fail: 0, timeout: 0 } };
            expect(qualityCalculator.calculateValue(metrics1)).toBeNull();
        });
    });
    describe('.calculateLevel', function () {
        it('returns quality level according to value', function () {
            expect(qualityCalculator.calculateLevel(0.1)).toEqual(quality_level_1.QualityLevel.LOW);
            expect(qualityCalculator.calculateLevel(0.3)).toEqual(quality_level_1.QualityLevel.MEDIUM);
            expect(qualityCalculator.calculateLevel(0.6)).toEqual(quality_level_1.QualityLevel.HIGH);
            expect(qualityCalculator.calculateLevel(null)).toEqual(quality_level_1.QualityLevel.UNKNOWN);
        });
    });
});
