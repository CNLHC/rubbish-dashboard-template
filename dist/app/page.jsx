"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var redux_1 = require("../libs/redux");
var global_1 = require("../libs/redux/global");
var IndexPage = function () {
    var dispatch = (0, redux_1.useAppDispatch)();
    var version = (0, redux_1.useAppSelector)(function (e) { return e.globalReducer.version; });
    var add = function () { return dispatch((0, global_1.ActSetGlobalState)({ version: version + 1 })); };
    return (<div>
      <antd_1.Button onClick={function () { return add(); }}></antd_1.Button>
      ver:{version}
    </div>);
};
exports.default = IndexPage;
