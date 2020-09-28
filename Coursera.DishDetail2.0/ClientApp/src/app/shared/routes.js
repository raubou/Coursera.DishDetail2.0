"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var default_component_1 = require("../default/default.component");
var menu_component_1 = require("../menu/menu.component");
var home_component_1 = require("../home/home.component");
var counter_component_1 = require("../counter/counter.component");
var fetch_data_component_1 = require("../fetch-data/fetch-data.component");
var about_component_1 = require("../about/about.component");
var contact_component_1 = require("../contact/contact.component");
exports.routes = [{ path: '', component: default_component_1.DefaultComponent, pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'counter', component: counter_component_1.CounterComponent },
    { path: 'fetch-data', component: fetch_data_component_1.FetchDataComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: 'menu', component: menu_component_1.MenuComponent }];
//# sourceMappingURL=routes.js.map