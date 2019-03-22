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
var quality_level_1 = require("../models/quality-level");
var QualityCalculator = /** @class */ (function () {
    function QualityCalculator() {
    }
    /**
     * Calculates quality number for given metrics.
     *
     * @return number between 0 and 1. If metrics are empty, null is returned.
     */
    QualityCalculator.prototype.calculateValue = function (metrics) {
        var counts = metrics.connectCount;
        var total = counts.success + counts.fail + counts.timeout;
        if (total === 0) {
            return null;
        }
        return counts.success / total;
    };
    QualityCalculator.prototype.calculateLevel = function (quality) {
        if (quality === null) {
            return quality_level_1.QualityLevel.UNKNOWN;
        }
        if (quality >= HIGH_QUALITY) {
            return quality_level_1.QualityLevel.HIGH;
        }
        if (quality >= MEDIUM_QUALITY) {
            return quality_level_1.QualityLevel.MEDIUM;
        }
        return quality_level_1.QualityLevel.LOW;
    };
    return QualityCalculator;
}());
exports.QualityCalculator = QualityCalculator;
var MEDIUM_QUALITY = 0.2;
var HIGH_QUALITY = 0.5;
