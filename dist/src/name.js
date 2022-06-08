"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Name {
    constructor(name) {
        this.lowerCase = '';
        this.upperCase = '';
        if (!name)
            return;
        this.lowerCase = name[0].toLocaleLowerCase() + name.substring(1, name.length);
        this.upperCase = name[0].toLocaleUpperCase() + name.substring(1, name.length);
    }
}
exports.default = Name;
//# sourceMappingURL=name.js.map