"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expand = exports.flyInOut = exports.visibility = void 0;
var animations_1 = require("@angular/animations");
function visibility() {
    return animations_1.trigger('visibility', [
        animations_1.state('shown', animations_1.style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        animations_1.state('hidden', animations_1.style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        animations_1.transition('* => *', animations_1.animate('0.5s ease-in-out'))
    ]);
}
exports.visibility = visibility;
function flyInOut() {
    return animations_1.trigger('flyInOut', [
        animations_1.state('*', animations_1.style({ opacity: 1, transform: 'translateX(0)' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateX(-100%)', opacity: 0 }),
            animations_1.animate('500ms ease-in')
        ]),
        animations_1.transition(':leave', [
            animations_1.animate('500ms ease-out', animations_1.style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
    ]);
}
exports.flyInOut = flyInOut;
function expand() {
    return animations_1.trigger('expand', [
        animations_1.state('*', animations_1.style({ opacity: 1, transform: 'translateX(0)' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateY(-50%)', opacity: 0 }),
            animations_1.animate('200ms ease-in', animations_1.style({ opacity: 1, transform: 'translateX(0)' }))
        ])
    ]);
}
exports.expand = expand;
//# sourceMappingURL=app.animations.js.map