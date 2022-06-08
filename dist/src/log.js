"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = void 0;
class Colors {
}
exports.Colors = Colors;
Colors.Read = '\x1b[31m';
Colors.Green = '\x1b[32m';
Colors.Yellow = '\x1b[33m';
Colors.Blue = '\x1b[34m';
Colors.White = '\x1b[37m';
function Log(text, color = Colors.White) {
    console.log(color + "%s\x1b[0m", text);
}
exports.default = Log;
//# sourceMappingURL=log.js.map