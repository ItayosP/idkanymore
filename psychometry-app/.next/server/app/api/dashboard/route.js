"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/dashboard/route";
exports.ids = ["app/api/dashboard/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "./action-async-storage.external?8dda":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external?3d59":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external?16bc":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fdashboard%2Froute&page=%2Fapi%2Fdashboard%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Froute.ts&appDir=C%3A%5CUsers%5Citayp%5COneDrive%5C%D7%9E%D7%A1%D7%9E%D7%9B%D7%99%D7%9D%5Cpsychometry%5Cpsychometry-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Citayp%5COneDrive%5C%D7%9E%D7%A1%D7%9E%D7%9B%D7%99%D7%9D%5Cpsychometry%5Cpsychometry-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fdashboard%2Froute&page=%2Fapi%2Fdashboard%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Froute.ts&appDir=C%3A%5CUsers%5Citayp%5COneDrive%5C%D7%9E%D7%A1%D7%9E%D7%9B%D7%99%D7%9D%5Cpsychometry%5Cpsychometry-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Citayp%5COneDrive%5C%D7%9E%D7%A1%D7%9E%D7%9B%D7%99%D7%9D%5Cpsychometry%5Cpsychometry-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_itayp_OneDrive_psychometry_psychometry_app_app_api_dashboard_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/dashboard/route.ts */ \"(rsc)/./app/api/dashboard/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/dashboard/route\",\n        pathname: \"/api/dashboard\",\n        filename: \"route\",\n        bundlePath: \"app/api/dashboard/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\itayp\\\\OneDrive\\\\מסמכים\\\\psychometry\\\\psychometry-app\\\\app\\\\api\\\\dashboard\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_itayp_OneDrive_psychometry_psychometry_app_app_api_dashboard_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/dashboard/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZkYXNoYm9hcmQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmRhc2hib2FyZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmRhc2hib2FyZCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNpdGF5cCU1Q09uZURyaXZlJTVDJUQ3JTlFJUQ3JUExJUQ3JTlFJUQ3JTlCJUQ3JTk5JUQ3JTlEJTVDcHN5Y2hvbWV0cnklNUNwc3ljaG9tZXRyeS1hcHAlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2l0YXlwJTVDT25lRHJpdmUlNUMlRDclOUUlRDclQTElRDclOUUlRDclOUIlRDclOTklRDclOUQlNUNwc3ljaG9tZXRyeSU1Q3BzeWNob21ldHJ5LWFwcCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDK0M7QUFDNUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wc3ljaG9tZXRyeS1hcHAvP2IxMWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcaXRheXBcXFxcT25lRHJpdmVcXFxc157Xodee15vXmdedXFxcXHBzeWNob21ldHJ5XFxcXHBzeWNob21ldHJ5LWFwcFxcXFxhcHBcXFxcYXBpXFxcXGRhc2hib2FyZFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvZGFzaGJvYXJkL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZGFzaGJvYXJkXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9kYXNoYm9hcmQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxpdGF5cFxcXFxPbmVEcml2ZVxcXFzXnteh157Xm9eZ151cXFxccHN5Y2hvbWV0cnlcXFxccHN5Y2hvbWV0cnktYXBwXFxcXGFwcFxcXFxhcGlcXFxcZGFzaGJvYXJkXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9kYXNoYm9hcmQvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fdashboard%2Froute&page=%2Fapi%2Fdashboard%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Froute.ts&appDir=C%3A%5CUsers%5Citayp%5COneDrive%5C%D7%9E%D7%A1%D7%9E%D7%9B%D7%99%D7%9D%5Cpsychometry%5Cpsychometry-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Citayp%5COneDrive%5C%D7%9E%D7%A1%D7%9E%D7%9B%D7%99%D7%9D%5Cpsychometry%5Cpsychometry-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/dashboard/route.ts":
/*!************************************!*\
  !*** ./app/api/dashboard/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _lib_authOptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/authOptions */ \"(rsc)/./lib/authOptions.ts\");\n\n\n\n\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_authOptions__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.id) {\n            return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify({\n                error: \"Unauthorized\"\n            }), {\n                status: 401,\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                }\n            });\n        }\n        const userId = session.user.id;\n        // 1. Fetch User Profile Data\n        const userName = session.user.name;\n        const userEmail = session.user.email;\n        const userImage = session.user.image;\n        // 2. Fetch Test Attempts (Get necessary fields for progress and recent attempts)\n        const attempts = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].testAttempt.findMany({\n            where: {\n                userId: userId\n            },\n            select: {\n                id: true,\n                section: true,\n                score: true,\n                completedAt: true\n            },\n            orderBy: {\n                completedAt: \"desc\"\n            }\n        });\n        // 3. Calculate Progress & Find Best Scores\n        const progress = {};\n        const sectionScores = {};\n        for (const attempt of attempts){\n            if (!sectionScores[attempt.section]) {\n                sectionScores[attempt.section] = [];\n            }\n            sectionScores[attempt.section].push(attempt.score);\n        }\n        for(const section in sectionScores){\n            const scores = sectionScores[section];\n            const totalScore = scores.reduce((sum, score)=>sum + score, 0);\n            const averageScore = scores.length > 0 ? Math.round(totalScore / scores.length) : 0;\n            const bestScore = scores.length > 0 ? Math.round(Math.max(...scores)) : 0;\n            progress[section] = {\n                count: scores.length,\n                averageScore: averageScore,\n                bestScore: bestScore\n            };\n        }\n        // 4. Get Recent Attempts (already sorted desc by date)\n        const recentAttempts = attempts.slice(0, 5).map((a)=>({\n                id: a.id,\n                section: a.section,\n                score: Math.round(a.score),\n                completedAt: a.completedAt\n            }));\n        // 5. Construct Response\n        const dashboardData = {\n            user: {\n                name: userName,\n                email: userEmail,\n                image: userImage\n            },\n            progress: progress,\n            recentAttempts: recentAttempts\n        };\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify(dashboardData), {\n            status: 200,\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n    } catch (error) {\n        console.error(\"Dashboard API Error:\", error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify({\n            error: \"Internal server error fetching dashboard data\"\n        }), {\n            status: 500,\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n    } finally{\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].$disconnect();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZHVDLFFBQVF2QyxLQUFLLENBQUMsd0JBQXdCQTtRQUN0QyxPQUFPLElBQUlYLHFEQUFZQSxDQUFDUyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsT0FBTztRQUFnRCxJQUFJO1lBQ2xHQyxRQUFRO1lBQ1JDLFNBQVM7Z0JBQUUsZ0JBQWdCO1lBQW1CO1FBQ2hEO0lBQ0YsU0FBVTtRQUNSLE1BQU1aLG1EQUFNQSxDQUFDa0QsV0FBVztJQUMxQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHN5Y2hvbWV0cnktYXBwLy4vYXBwL2FwaS9kYXNoYm9hcmQvcm91dGUudHM/ZWI0NSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCBwcmlzbWEgZnJvbSAnQC9saWIvcHJpc21hJztcclxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aC9uZXh0JztcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2xpYi9hdXRoT3B0aW9ucyc7XHJcblxyXG4vLyBEZWZpbmUgdGhlIHN0cnVjdHVyZSBmb3IgcHJvZ3Jlc3MgZGF0YVxyXG5pbnRlcmZhY2UgUHJvZ3Jlc3NJdGVtIHtcclxuICBjb3VudDogbnVtYmVyO1xyXG4gIGF2ZXJhZ2VTY29yZTogbnVtYmVyO1xyXG4gIGJlc3RTY29yZTogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUHJvZ3Jlc3NEYXRhIHtcclxuICBbc2VjdGlvbjogc3RyaW5nXTogUHJvZ3Jlc3NJdGVtO1xyXG59XHJcblxyXG4vLyBEZWZpbmUgc3RydWN0dXJlIGZvciByZWNlbnQgYXR0ZW1wdHNcclxuaW50ZXJmYWNlIFJlY2VudEF0dGVtcHQge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgc2VjdGlvbjogc3RyaW5nO1xyXG4gIHNjb3JlOiBudW1iZXI7XHJcbiAgY29tcGxldGVkQXQ6IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xyXG4gICAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9KSwge1xyXG4gICAgICAgIHN0YXR1czogNDAxLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1c2VySWQgPSBzZXNzaW9uLnVzZXIuaWQ7XHJcblxyXG4gICAgLy8gMS4gRmV0Y2ggVXNlciBQcm9maWxlIERhdGFcclxuICAgIGNvbnN0IHVzZXJOYW1lID0gc2Vzc2lvbi51c2VyLm5hbWU7XHJcbiAgICBjb25zdCB1c2VyRW1haWwgPSBzZXNzaW9uLnVzZXIuZW1haWw7XHJcbiAgICBjb25zdCB1c2VySW1hZ2UgPSBzZXNzaW9uLnVzZXIuaW1hZ2U7XHJcblxyXG4gICAgLy8gMi4gRmV0Y2ggVGVzdCBBdHRlbXB0cyAoR2V0IG5lY2Vzc2FyeSBmaWVsZHMgZm9yIHByb2dyZXNzIGFuZCByZWNlbnQgYXR0ZW1wdHMpXHJcbiAgICBjb25zdCBhdHRlbXB0cyA9IGF3YWl0IHByaXNtYS50ZXN0QXR0ZW1wdC5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlOiB7IHVzZXJJZDogdXNlcklkIH0sXHJcbiAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgIGlkOiB0cnVlLFxyXG4gICAgICAgIHNlY3Rpb246IHRydWUsXHJcbiAgICAgICAgc2NvcmU6IHRydWUsXHJcbiAgICAgICAgY29tcGxldGVkQXQ6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICBjb21wbGV0ZWRBdDogJ2Rlc2MnLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gMy4gQ2FsY3VsYXRlIFByb2dyZXNzICYgRmluZCBCZXN0IFNjb3Jlc1xyXG4gICAgY29uc3QgcHJvZ3Jlc3M6IFByb2dyZXNzRGF0YSA9IHt9O1xyXG4gICAgY29uc3Qgc2VjdGlvblNjb3JlczogeyBbc2VjdGlvbjogc3RyaW5nXTogbnVtYmVyW10gfSA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgYXR0ZW1wdCBvZiBhdHRlbXB0cykge1xyXG4gICAgICBpZiAoIXNlY3Rpb25TY29yZXNbYXR0ZW1wdC5zZWN0aW9uXSkge1xyXG4gICAgICAgIHNlY3Rpb25TY29yZXNbYXR0ZW1wdC5zZWN0aW9uXSA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIHNlY3Rpb25TY29yZXNbYXR0ZW1wdC5zZWN0aW9uXS5wdXNoKGF0dGVtcHQuc2NvcmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3Qgc2VjdGlvbiBpbiBzZWN0aW9uU2NvcmVzKSB7XHJcbiAgICAgIGNvbnN0IHNjb3JlcyA9IHNlY3Rpb25TY29yZXNbc2VjdGlvbl07XHJcbiAgICAgIGNvbnN0IHRvdGFsU2NvcmUgPSBzY29yZXMucmVkdWNlKChzdW0sIHNjb3JlKSA9PiBzdW0gKyBzY29yZSwgMCk7XHJcbiAgICAgIGNvbnN0IGF2ZXJhZ2VTY29yZSA9IHNjb3Jlcy5sZW5ndGggPiAwID8gTWF0aC5yb3VuZCh0b3RhbFNjb3JlIC8gc2NvcmVzLmxlbmd0aCkgOiAwO1xyXG4gICAgICBjb25zdCBiZXN0U2NvcmUgPSBzY29yZXMubGVuZ3RoID4gMCA/IE1hdGgucm91bmQoTWF0aC5tYXgoLi4uc2NvcmVzKSkgOiAwO1xyXG4gICAgICBwcm9ncmVzc1tzZWN0aW9uXSA9IHtcclxuICAgICAgICBjb3VudDogc2NvcmVzLmxlbmd0aCxcclxuICAgICAgICBhdmVyYWdlU2NvcmU6IGF2ZXJhZ2VTY29yZSxcclxuICAgICAgICBiZXN0U2NvcmU6IGJlc3RTY29yZSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA0LiBHZXQgUmVjZW50IEF0dGVtcHRzIChhbHJlYWR5IHNvcnRlZCBkZXNjIGJ5IGRhdGUpXHJcbiAgICBjb25zdCByZWNlbnRBdHRlbXB0czogUmVjZW50QXR0ZW1wdFtdID0gYXR0ZW1wdHMuc2xpY2UoMCwgNSkubWFwKGEgPT4gKHtcclxuICAgICAgaWQ6IGEuaWQsXHJcbiAgICAgIHNlY3Rpb246IGEuc2VjdGlvbixcclxuICAgICAgc2NvcmU6IE1hdGgucm91bmQoYS5zY29yZSksXHJcbiAgICAgIGNvbXBsZXRlZEF0OiBhLmNvbXBsZXRlZEF0XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gNS4gQ29uc3RydWN0IFJlc3BvbnNlXHJcbiAgICBjb25zdCBkYXNoYm9hcmREYXRhID0ge1xyXG4gICAgICB1c2VyOiB7XHJcbiAgICAgICAgbmFtZTogdXNlck5hbWUsXHJcbiAgICAgICAgZW1haWw6IHVzZXJFbWFpbCxcclxuICAgICAgICBpbWFnZTogdXNlckltYWdlLFxyXG4gICAgICB9LFxyXG4gICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXHJcbiAgICAgIHJlY2VudEF0dGVtcHRzOiByZWNlbnRBdHRlbXB0cyxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZGFzaGJvYXJkRGF0YSksIHtcclxuICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgfSk7XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdEYXNoYm9hcmQgQVBJIEVycm9yOicsIGVycm9yKTtcclxuICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3IgZmV0Y2hpbmcgZGFzaGJvYXJkIGRhdGEnIH0pLCB7XHJcbiAgICAgIHN0YXR1czogNTAwLFxyXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgIH0pO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBhd2FpdCBwcmlzbWEuJGRpc2Nvbm5lY3QoKTtcclxuICB9XHJcbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsIkdFVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwidXNlciIsImlkIiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9yIiwic3RhdHVzIiwiaGVhZGVycyIsInVzZXJJZCIsInVzZXJOYW1lIiwibmFtZSIsInVzZXJFbWFpbCIsImVtYWlsIiwidXNlckltYWdlIiwiaW1hZ2UiLCJhdHRlbXB0cyIsInRlc3RBdHRlbXB0IiwiZmluZE1hbnkiLCJ3aGVyZSIsInNlbGVjdCIsInNlY3Rpb24iLCJzY29yZSIsImNvbXBsZXRlZEF0Iiwib3JkZXJCeSIsInByb2dyZXNzIiwic2VjdGlvblNjb3JlcyIsImF0dGVtcHQiLCJwdXNoIiwic2NvcmVzIiwidG90YWxTY29yZSIsInJlZHVjZSIsInN1bSIsImF2ZXJhZ2VTY29yZSIsImxlbmd0aCIsIk1hdGgiLCJyb3VuZCIsImJlc3RTY29yZSIsIm1heCIsImNvdW50IiwicmVjZW50QXR0ZW1wdHMiLCJzbGljZSIsIm1hcCIsImEiLCJkYXNoYm9hcmREYXRhIiwiY29uc29sZSIsIiRkaXNjb25uZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/dashboard/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/authOptions.ts":
/*!****************************!*\
  !*** ./lib/authOptions.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n // Adjust path if needed\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\",\n                    placeholder: \"test@example.com\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials, req) {\n                if (!credentials?.email || !credentials?.password) {\n                    console.log(\"Authorize: Missing credentials\");\n                    return null;\n                }\n                console.log(\"Authorize: Finding user for email:\", credentials.email);\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    console.log(\"Authorize: User not found\");\n                    return null;\n                }\n                console.log(\"Authorize: Comparing password for user:\", user.email);\n                const isValidPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password);\n                if (!isValidPassword) {\n                    console.log(\"Authorize: Invalid password\");\n                    return null;\n                }\n                console.log(\"Authorize: Success for user:\", user.email);\n                // Return user object without password\n                return {\n                    id: user.id,\n                    name: user.name,\n                    email: user.email\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    jwt: {\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            // token.name = user.name;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user && token.id) {\n                session.user.id = token.id;\n            // session.user.name = token.name as string;\n            }\n            console.log(\"Session Callback - Populated Session:\", session);\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aE9wdGlvbnMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ2tFO0FBQ1I7QUFDeEIsQ0FBQyx3QkFBd0I7QUFDN0I7QUFFdkIsTUFBTUksY0FBK0I7SUFDMUNDLFNBQVNKLHdFQUFhQSxDQUFDQyxtREFBTUE7SUFDN0JJLFdBQVc7UUFDVE4sMkVBQW1CQSxDQUFDO1lBQ2xCTyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07b0JBQVNDLGFBQWE7Z0JBQW1CO2dCQUN4RUMsVUFBVTtvQkFBRUgsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1HLFdBQVVOLFdBQVcsRUFBRU8sR0FBRztnQkFDOUIsSUFBSSxDQUFDUCxhQUFhQyxTQUFTLENBQUNELGFBQWFLLFVBQVU7b0JBQ2pERyxRQUFRQyxHQUFHLENBQUM7b0JBQ1osT0FBTztnQkFDVDtnQkFFQUQsUUFBUUMsR0FBRyxDQUFDLHNDQUFzQ1QsWUFBWUMsS0FBSztnQkFDbkUsTUFBTVMsT0FBTyxNQUFNaEIsbURBQU1BLENBQUNnQixJQUFJLENBQUNDLFVBQVUsQ0FBQztvQkFDeENDLE9BQU87d0JBQUVYLE9BQU9ELFlBQVlDLEtBQUs7b0JBQUM7Z0JBQ3BDO2dCQUVBLElBQUksQ0FBQ1MsTUFBTTtvQkFDVEYsUUFBUUMsR0FBRyxDQUFDO29CQUNaLE9BQU87Z0JBQ1Q7Z0JBRUFELFFBQVFDLEdBQUcsQ0FBQywyQ0FBMkNDLEtBQUtULEtBQUs7Z0JBQ2pFLE1BQU1ZLGtCQUFrQixNQUFNbEIsdURBQWMsQ0FBQ0ssWUFBWUssUUFBUSxFQUFFSyxLQUFLTCxRQUFRO2dCQUVoRixJQUFJLENBQUNRLGlCQUFpQjtvQkFDcEJMLFFBQVFDLEdBQUcsQ0FBQztvQkFDWixPQUFPO2dCQUNUO2dCQUVBRCxRQUFRQyxHQUFHLENBQUMsZ0NBQWdDQyxLQUFLVCxLQUFLO2dCQUN0RCxzQ0FBc0M7Z0JBQ3RDLE9BQU87b0JBQ0xjLElBQUlMLEtBQUtLLEVBQUU7b0JBQ1hoQixNQUFNVyxLQUFLWCxJQUFJO29CQUNmRSxPQUFPUyxLQUFLVCxLQUFLO2dCQUVuQjtZQUNGO1FBQ0Y7S0FDRDtJQUNEZSxTQUFTO1FBQ1BDLFVBQVU7SUFHWjtJQUNBQyxLQUFLO0lBR0w7SUFDQUMsV0FBVztRQUNULE1BQU1ELEtBQUksRUFBRUUsS0FBSyxFQUFFVixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUlUsTUFBTUwsRUFBRSxHQUFHTCxLQUFLSyxFQUFFO1lBQ2xCLDBCQUEwQjtZQUM1QjtZQUNBLE9BQU9LO1FBQ1Q7UUFDQSxNQUFNSixTQUFRLEVBQUVBLE9BQU8sRUFBRUksS0FBSyxFQUFFO1lBQzlCLElBQUlKLFFBQVFOLElBQUksSUFBSVUsTUFBTUwsRUFBRSxFQUFFO2dCQUMxQkMsUUFBUU4sSUFBSSxDQUFTSyxFQUFFLEdBQUdLLE1BQU1MLEVBQUU7WUFDbkMsNENBQTRDO1lBQy9DO1lBQ0NQLFFBQVFDLEdBQUcsQ0FBQyx5Q0FBeUNPO1lBQ3RELE9BQU9BO1FBQ1Q7SUFDRjtJQUNBSyxPQUFPO1FBQ0xDLFFBQVE7SUFLVjtBQUVGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wc3ljaG9tZXRyeS1hcHAvLi9saWIvYXV0aE9wdGlvbnMudHM/OTExMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcclxuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gJ0BuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXInO1xyXG5pbXBvcnQgcHJpc21hIGZyb20gJ0AvbGliL3ByaXNtYSc7IC8vIEFkanVzdCBwYXRoIGlmIG5lZWRlZFxyXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xyXG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiAnQ3JlZGVudGlhbHMnLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwidGVzdEBleGFtcGxlLmNvbVwiIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzLCByZXEpIHtcclxuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnQXV0aG9yaXplOiBNaXNzaW5nIGNyZWRlbnRpYWxzJyk7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBdXRob3JpemU6IEZpbmRpbmcgdXNlciBmb3IgZW1haWw6JywgY3JlZGVudGlhbHMuZW1haWwpO1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdBdXRob3JpemU6IFVzZXIgbm90IGZvdW5kJyk7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBdXRob3JpemU6IENvbXBhcmluZyBwYXNzd29yZCBmb3IgdXNlcjonLCB1c2VyLmVtYWlsKTtcclxuICAgICAgICBjb25zdCBpc1ZhbGlkUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcblxyXG4gICAgICAgIGlmICghaXNWYWxpZFBhc3N3b3JkKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnQXV0aG9yaXplOiBJbnZhbGlkIHBhc3N3b3JkJyk7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBdXRob3JpemU6IFN1Y2Nlc3MgZm9yIHVzZXI6JywgdXNlci5lbWFpbCk7XHJcbiAgICAgICAgLy8gUmV0dXJuIHVzZXIgb2JqZWN0IHdpdGhvdXQgcGFzc3dvcmRcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgIC8vIEFkZCBvdGhlciBwcm9wZXJ0aWVzIG5lZWRlZCBmb3IgdGhlIHNlc3Npb24vSldUXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiAnand0JyxcclxuICAgIC8vIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGRheXNcclxuICAgIC8vIHVwZGF0ZUFnZTogMjQgKiA2MCAqIDYwLCAvLyAyNCBob3Vyc1xyXG4gIH0sXHJcbiAgand0OiB7XHJcbiAgICAvLyBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcclxuICAgIC8vIGVuY3J5cHRpb246IHRydWUsXHJcbiAgfSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XHJcbiAgICAgICAgLy8gdG9rZW4ubmFtZSA9IHVzZXIubmFtZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHNlc3Npb24udXNlciAmJiB0b2tlbi5pZCkge1xyXG4gICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQgPSB0b2tlbi5pZDtcclxuICAgICAgICAgLy8gc2Vzc2lvbi51c2VyLm5hbWUgPSB0b2tlbi5uYW1lIGFzIHN0cmluZztcclxuICAgICAgfVxyXG4gICAgICAgY29uc29sZS5sb2coXCJTZXNzaW9uIENhbGxiYWNrIC0gUG9wdWxhdGVkIFNlc3Npb246XCIsIHNlc3Npb24pO1xyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH1cclxuICB9LFxyXG4gIHBhZ2VzOiB7XHJcbiAgICBzaWduSW46ICcvbG9naW4nLFxyXG4gICAgLy8gc2lnbk91dDogJy9hdXRoL3NpZ25vdXQnLFxyXG4gICAgLy8gZXJyb3I6ICcvYXV0aC9lcnJvcicsXHJcbiAgICAvLyB2ZXJpZnlSZXF1ZXN0OiAnL2F1dGgvdmVyaWZ5LXJlcXVlc3QnLFxyXG4gICAgLy8gbmV3VXNlcjogJy9hdXRoL25ldy11c2VyJ1xyXG4gIH0sXHJcbiAgLy8gZGVidWc6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnLFxyXG59OyAiXSwibmFtZXMiOlsiQ3JlZGVudGlhbHNQcm92aWRlciIsIlByaXNtYUFkYXB0ZXIiLCJwcmlzbWEiLCJiY3J5cHQiLCJhdXRoT3B0aW9ucyIsImFkYXB0ZXIiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBsYWNlaG9sZGVyIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJyZXEiLCJjb25zb2xlIiwibG9nIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlzVmFsaWRQYXNzd29yZCIsImNvbXBhcmUiLCJpZCIsInNlc3Npb24iLCJzdHJhdGVneSIsImp3dCIsImNhbGxiYWNrcyIsInRva2VuIiwicGFnZXMiLCJzaWduSW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/authOptions.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n});\nif (true) global.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQVE5QyxNQUFNQyxTQUNKQyxPQUFPRCxNQUFNLElBQ2IsSUFBSUQsd0RBQVlBLENBQUM7QUFFakI7QUFFRixJQUFJRyxJQUF5QixFQUFjRCxPQUFPRCxNQUFNLEdBQUdBO0FBRTNELGlFQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHN5Y2hvbWV0cnktYXBwLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICAvLyBhbGxvdyBnbG9iYWwgYHZhcmAgZGVjbGFyYXRpb25zXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXZhclxyXG4gIHZhciBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZFxyXG59XHJcblxyXG5jb25zdCBwcmlzbWEgPSBcclxuICBnbG9iYWwucHJpc21hIHx8IFxyXG4gIG5ldyBQcmlzbWFDbGllbnQoe1xyXG4gICAgLy8gbG9nOiBbJ3F1ZXJ5J10sIC8vIFVuY29tbWVudCB0byBzZWUgU1FMIHF1ZXJpZXMgaW4gbG9nc1xyXG4gIH0pO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbC5wcmlzbWEgPSBwcmlzbWE7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7ICJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJnbG9iYWwiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/bcryptjs","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fdashboard%2Froute&page=%2Fapi%2Fdashboard%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Froute.ts&appDir=C%3A%5CUsers%5Citayp%5COneDrive%5C%D7%9E%D7%A1%D7%9E%D7%9B%D7%99%D7%9D%5Cpsychometry%5Cpsychometry-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Citayp%5COneDrive%5C%D7%9E%D7%A1%D7%9E%D7%9B%D7%99%D7%9D%5Cpsychometry%5Cpsychometry-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();