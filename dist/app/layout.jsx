"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var main_layout_1 = __importDefault(require("../components/main-layout"));
var progress_bar_1 = __importDefault(require("../components/progress-bar"));
var redux_1 = require("../libs/redux");
function RootLayout(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), mounted = _b[0], setMounted = _b[1];
    (0, react_1.useEffect)(function () { return setMounted(true); }, []);
    if (typeof window !== "undefined") {
        window.onload = function () {
            document.getElementById("holderStyle").remove();
        };
    }
    return (<react_redux_1.Provider store={redux_1.store}>
      <html lang="en">
        <head>
          <style id="holderStyle" dangerouslySetInnerHTML={{
            __html: "\n                    *, *::before, *::after {\n                        transition: none!important;\n                    }\n                    ",
        }}/>
        </head>
        <body style={{ visibility: !mounted ? "hidden" : "visible" }}>
          <progress_bar_1.default />
          <main_layout_1.default>{children}</main_layout_1.default>
        </body>
      </html>
    </react_redux_1.Provider>);
}
exports.default = RootLayout;
