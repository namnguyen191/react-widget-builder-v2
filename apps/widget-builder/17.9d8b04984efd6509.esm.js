"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[17],{

/***/ 44164:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ stjs_editor_src)
});

// EXTERNAL MODULE: ../../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(52322);
// EXTERNAL MODULE: ../../node_modules/@mui/icons-material/ChevronLeft.js
var ChevronLeft = __webpack_require__(49001);
// EXTERNAL MODULE: ../../node_modules/@mui/icons-material/ChevronRight.js
var ChevronRight = __webpack_require__(28319);
// EXTERNAL MODULE: ../../node_modules/@mui/icons-material/DataObject.js
var DataObject = __webpack_require__(98490);
// EXTERNAL MODULE: ../../node_modules/@mui/material/styles/styled.js + 2 modules
var styled = __webpack_require__(916);
// EXTERNAL MODULE: ../../node_modules/@mui/material/styles/useTheme.js
var useTheme = __webpack_require__(47746);
// EXTERNAL MODULE: ../../node_modules/@mui/material/Drawer/Drawer.js + 16 modules
var Drawer = __webpack_require__(85825);
// EXTERNAL MODULE: ../../node_modules/@mui/material/IconButton/IconButton.js + 1 modules
var IconButton = __webpack_require__(85801);
// EXTERNAL MODULE: ../../node_modules/@mui/material/Divider/Divider.js + 1 modules
var Divider = __webpack_require__(51721);
// EXTERNAL MODULE: ../../node_modules/@mui/material/Fab/Fab.js + 1 modules
var Fab = __webpack_require__(22531);
// EXTERNAL MODULE: ../../libs/shared/components/code-editor/src/index.ts + 28 modules
var src = __webpack_require__(70253);
;// CONCATENATED MODULE: ../../libs/shared/utils/src/lib/shared-utils.ts
var debounced = function(cb, delay) {
    if (delay === void 0) delay = 500;
    var cbTimer = null;
    clearTimeout();
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (cbTimer) {
            console.log("Nam data is: clear");
            clearTimeout(cbTimer);
        }
        cbTimer = window.setTimeout(function() {
            cb.apply(void 0, args);
        }, delay);
    };
};

// EXTERNAL MODULE: ../../node_modules/prettier/standalone.js
var standalone = __webpack_require__(29691);
var standalone_default = /*#__PURE__*/__webpack_require__.n(standalone);
// EXTERNAL MODULE: ../../node_modules/prettier/parser-babel.js
var parser_babel = __webpack_require__(98483);
var parser_babel_default = /*#__PURE__*/__webpack_require__.n(parser_babel);
// EXTERNAL MODULE: ../../node_modules/re-resizable/lib/index.js + 1 modules
var lib = __webpack_require__(75233);
// EXTERNAL MODULE: ../../node_modules/react/index.js
var react = __webpack_require__(2784);
// EXTERNAL MODULE: ../../node_modules/react-toastify/dist/react-toastify.esm.js
var react_toastify_esm = __webpack_require__(90047);
// EXTERNAL MODULE: ../../node_modules/stjs/st.js
var st = __webpack_require__(65855);
;// CONCATENATED MODULE: ../../libs/features/stjs-editor/src/lib/FeaturesStjsEditor.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const FeaturesStjsEditor_module = ({"container":"FeaturesStjsEditor_container__2tdWP","dataButton":"FeaturesStjsEditor_dataButton__111cv","editorsContainer":"FeaturesStjsEditor_editorsContainer__1JGAs","codeEditorContainer":"FeaturesStjsEditor_codeEditorContainer__2rhOU","transformResult":"FeaturesStjsEditor_transformResult__3PQMQ"});
;// CONCATENATED MODULE: ../../libs/features/stjs-editor/src/lib/FeaturesStjsEditor.tsx
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};












// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore nx react compiler can't seems to understand that this exist


var drawerWidth = "45vw";
var DrawerHeader = (0,styled/* default */.ZP)("div")(function(param) {
    var theme = param.theme;
    return _extends({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1)
    }, theme.mixins.toolbar, {
        justifyContent: "flex-start"
    });
});
var prettierJsonConfig = {
    parser: "json",
    plugins: [
        (parser_babel_default())
    ]
};
var INITIAL_STJS_PROPERTIES = {
    template: "{}",
    stringifyTemplate: '"{}"',
    data: "{}",
    result: "{}"
};
var debounceToast = debounced(react_toastify_esm/* toast.error */.Am.error, 1000);
var trimAllExcessWhiteSpaces = function(val) {
    return val.replace(/\s+/g, " ").trim();
};
var trimAllLineBreaks = function(val) {
    return val.replace(/\\n/g, "");
};
var trimAllTabs = function(val) {
    return val.replace(/\\t/g, "");
};
var FeaturesStjsEditor = function() {
    // drawer properties
    var theme = (0,useTheme/* default */.Z)();
    var ref = react.useState(false), open = ref[0], setOpen = ref[1];
    // stjs properties
    var ref1 = (0,react.useState)(INITIAL_STJS_PROPERTIES), transformProperties = ref1[0], setTransformProperties = ref1[1];
    var generateTemplateString = function(val) {
        var result = trimAllLineBreaks(val);
        result = trimAllTabs(result);
        result = trimAllExcessWhiteSpaces(result);
        return result;
    };
    var handleDrawerOpen = function() {
        setOpen(true);
    };
    var handleDrawerClose = function() {
        setOpen(false);
    };
    var onTemplateChange = function(val) {
        if (!val) {
            return;
        }
        var parsedData = JSON.parse(transformProperties.data);
        var parsedVal = JSON.parse(val);
        var transformResult = st.select(parsedData).transformWith(parsedVal).root();
        setTransformProperties(function(prev) {
            return {
                data: prev.data,
                template: val,
                stringifyTemplate: generateTemplateString(JSON.stringify(val)),
                result: standalone_default().format(JSON.stringify(transformResult), prettierJsonConfig)
            };
        });
    };
    var onStringifyTemplateChange = function(val) {
        if (!val) {
            return;
        }
        var template = {};
        try {
            template = JSON.parse(JSON.parse(val));
        } catch (err) {
            if (_instanceof(err, Error)) {
                debounceToast(err.message);
            }
            if (typeof err === "string") {
                react_toastify_esm/* toast.error */.Am.error(err);
            }
        }
        var transformResult = st.select(transformProperties.data).transformWith(template, null, true).root();
        setTransformProperties(function(prev) {
            return {
                stringifyTemplate: val,
                template: JSON.stringify(template),
                data: prev.data,
                result: JSON.stringify(transformResult)
            };
        });
    };
    var onDataChange = function(val) {
        if (!val) {
            return;
        }
        var parsedData = JSON.parse(val);
        var parsedTemplate = JSON.parse(transformProperties.template);
        var transformResult = st.select(parsedData).transformWith(parsedTemplate).root();
        console.log("Nam data is: ", typeof transformResult === "undefined" ? "undefined" : _typeof(transformResult));
        setTransformProperties(function(prev) {
            return _extends({}, prev, {
                data: val,
                result: standalone_default().format(JSON.stringify(transformResult), prettierJsonConfig)
            });
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: FeaturesStjsEditor_module.container,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(Drawer/* default */.ZP, {
                sx: {
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth
                    }
                },
                variant: "persistent",
                anchor: "right",
                open: open,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(DrawerHeader, {
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(IconButton/* default */.Z, {
                            onClick: handleDrawerClose,
                            children: theme.direction === "rtl" ? /*#__PURE__*/ (0,jsx_runtime.jsx)(ChevronLeft/* default */.Z, {}) : /*#__PURE__*/ (0,jsx_runtime.jsx)(ChevronRight/* default */.Z, {})
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(Divider/* default */.Z, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(src/* SharedComponentsCodeEditor */.N, {
                        initialValue: transformProperties.data,
                        onChange: onDataChange,
                        language: "json",
                        prettierConfigOverride: prettierJsonConfig
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(Fab/* default */.Z, {
                variant: "extended",
                className: FeaturesStjsEditor_module.dataButton,
                onClick: handleDrawerOpen,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(DataObject/* default */.Z, {
                        sx: {
                            mr: 1
                        }
                    }),
                    "Data"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: FeaturesStjsEditor_module.editorsContainer,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(lib/* Resizable */.e, {
                        defaultSize: {
                            height: "60vh",
                            width: "47vw"
                        },
                        className: FeaturesStjsEditor_module.codeEditorContainer,
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(src/* SharedComponentsCodeEditor */.N, {
                            initialValue: transformProperties.template,
                            language: "json",
                            prettierConfigOverride: prettierJsonConfig,
                            onChange: onTemplateChange
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(lib/* Resizable */.e, {
                        defaultSize: {
                            height: "60vh",
                            width: "47vw"
                        },
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(src/* SharedComponentsCodeEditor */.N, {
                            initialValue: transformProperties.result,
                            prettierConfigOverride: prettierJsonConfig,
                            language: "json",
                            readonly: true
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(lib/* Resizable */.e, {
                        defaultSize: {
                            height: "25vh",
                            width: "95vw"
                        },
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(src/* SharedComponentsCodeEditor */.N, {
                            enableFormat: false,
                            language: "text",
                            initialValue: transformProperties.stringifyTemplate,
                            onChange: onStringifyTemplateChange
                        })
                    })
                ]
            })
        ]
    });
};

;// CONCATENATED MODULE: ../../libs/features/stjs-editor/src/index.ts

/* harmony default export */ const stjs_editor_src = (FeaturesStjsEditor);


/***/ })

}]);