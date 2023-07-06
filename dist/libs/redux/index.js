"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.useAppSelector = exports.useAppDispatch = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var react_redux_1 = require("react-redux");
var redux_logger_1 = __importDefault(require("redux-logger"));
var global_1 = require("./global");
var rootReducer = (0, toolkit_1.combineReducers)({
    globalReducer: global_1.globalReducer,
});
var store = (0, toolkit_1.configureStore)({
    reducer: rootReducer,
    middleware: function (g) { return g().prepend(redux_logger_1.default); },
});
exports.store = store;
exports.useAppDispatch = react_redux_1.useDispatch;
exports.useAppSelector = react_redux_1.useSelector;
