"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalReducer = exports.ActSetGlobalState = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initGlobalState = {
    loading: false,
    version: 0,
};
exports.ActSetGlobalState = (0, toolkit_1.createAction)("setGlobalState");
exports.globalReducer = (0, toolkit_1.createReducer)(initGlobalState, function (b) {
    b.addCase(exports.ActSetGlobalState, function (s, action) {
        Object.assign(s, action.payload);
        return s;
    });
});
