"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppPage = void 0;
var protractor_1 = require("protractor");
var AppPage = /** @class */ (function () {
    function AppPage() {
    }
    //navigateTo() {
    //  return browser.get('/');
    //}
    //getMainHeading() {
    //  return element(by.css('app-root h1')).getText();
    //}
    AppPage.prototype.navigateTo = function (link) {
        return protractor_1.browser.get(link);
    };
    AppPage.prototype.getParagraphText = function (selector) {
        return protractor_1.element(protractor_1.by.css(selector)).getText();
    };
    AppPage.prototype.getElement = function (selector) {
        return protractor_1.element(protractor_1.by.css(selector));
    };
    AppPage.prototype.getAllElements = function (selector) {
        return protractor_1.element.all(protractor_1.by.css(selector));
    };
    return AppPage;
}());
exports.AppPage = AppPage;
//# sourceMappingURL=app.po.js.map