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
/**
 * Indicates proposal level of quality.
 */
var QualityLevel;
(function (QualityLevel) {
    QualityLevel[QualityLevel["LOW"] = 0] = "LOW";
    QualityLevel[QualityLevel["MEDIUM"] = 1] = "MEDIUM";
    QualityLevel[QualityLevel["HIGH"] = 2] = "HIGH";
    QualityLevel[QualityLevel["UNKNOWN"] = 3] = "UNKNOWN";
})(QualityLevel || (QualityLevel = {}));
exports.QualityLevel = QualityLevel;
