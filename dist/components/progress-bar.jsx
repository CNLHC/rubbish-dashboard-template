"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nprogress_1 = __importDefault(require("nprogress"));
var react_1 = require("react");
function ProgressBar() {
    (0, react_1.useEffect)(function () {
        nprogress_1.default.configure({ showSpinner: false });
        var handleAnchorClick = function (event) {
            var targetUrl = event.currentTarget.href;
            var currentUrl = window.location.href;
            if (targetUrl !== currentUrl) {
                nprogress_1.default.start();
            }
        };
        var handleMutation = function () {
            var anchorElements = document.querySelectorAll("a[href]");
            anchorElements.forEach(function (anchor) {
                return anchor.addEventListener("click", handleAnchorClick);
            });
        };
        var mutationObserver = new MutationObserver(handleMutation);
        mutationObserver.observe(document, { childList: true, subtree: true });
        window.history.pushState = new Proxy(window.history.pushState, {
            apply: function (target, thisArg, argArray) {
                nprogress_1.default.done();
                return target.apply(thisArg, argArray);
            },
        });
    });
    var height = "2px";
    var color = "#73d13d";
    var styles = (<style>
      {"\n        #nprogress {\n          pointer-events: none;\n        }\n        #nprogress .bar {\n          background: ".concat(color, ";\n          position: fixed;\n          z-index: 99999;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: ").concat(typeof height === "string" ? height : "".concat(height, "px"), ";\n        }\n        /* Fancy blur effect */\n        #nprogress .peg {\n          display: block;\n          position: absolute;\n          right: 0px;\n          width: 100px;\n          height: 100%;\n          box-shadow: 0 0 10px ").concat(color, ", 0 0 5px ").concat(color, ";\n          opacity: 1.0;\n          -webkit-transform: rotate(3deg) translate(0px, -4px);\n              -ms-transform: rotate(3deg) translate(0px, -4px);\n                  transform: rotate(3deg) translate(0px, -4px);\n        }\n    ")}
    </style>);
    return styles;
}
exports.default = ProgressBar;
