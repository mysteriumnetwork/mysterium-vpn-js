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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Internal type for capturing duration and error of function
var utils_1 = require("../utils");
/**
 * Executes given function and sleeps for remaining time.
 * If .cancel() is invoked, than sleep is skipped after function finishes.
 */
var ThresholdExecutor = /** @class */ (function () {
    function ThresholdExecutor(func, threshold, errorCallback) {
        this.func = func;
        this.threshold = threshold;
        this.errorCallback = errorCallback;
        this.canceled = false;
    }
    /**
     * Executes given function and sleeps for remaining time, if .cancel() was not invoked.
     * @returns {Promise<void>}
     */
    ThresholdExecutor.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var executionResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.executeFunction()];
                    case 1:
                        executionResult = _a.sent();
                        if (executionResult.error && this.errorCallback) {
                            this.errorCallback(executionResult.error);
                        }
                        return [4 /*yield*/, this.sleepRemainingTime(executionResult.duration)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Forces currently function execution to skip sleep.
     */
    ThresholdExecutor.prototype.cancel = function () {
        this.canceled = true;
    };
    ThresholdExecutor.prototype.executeFunction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var start, error, err_1, end;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = Date.now();
                        error = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.func()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        error = err_1;
                        return [3 /*break*/, 4];
                    case 4:
                        end = Date.now();
                        return [2 /*return*/, { duration: end - start, error: error }];
                }
            });
        });
    };
    ThresholdExecutor.prototype.sleepRemainingTime = function (duration) {
        return __awaiter(this, void 0, void 0, function () {
            var sleepTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sleepTime = this._remainingSleepTime(duration);
                        if (!(sleepTime > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.sleep(sleepTime)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ThresholdExecutor.prototype._remainingSleepTime = function (duration) {
        if (this.canceled || duration >= this.threshold) {
            return 0;
        }
        return this.threshold - duration;
    };
    return ThresholdExecutor;
}());
exports.ThresholdExecutor = ThresholdExecutor;
