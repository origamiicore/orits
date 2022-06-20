#!/usr/bin/env node
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const files_1 = __importDefault(require("./src/files"));
const log_1 = __importStar(require("./src/log"));
const name_1 = __importDefault(require("./src/name"));
const { exec, spawn } = require('child_process');
class OriTs {
    constructor() {
        this.dir = '';
        (0, log_1.default)('OriTS v0.0.13');
        var method = process.argv[2];
        var defaultVar = process.argv[3];
        this.dir = process.cwd();
        if (method == 'addservice') {
            this.addService(defaultVar);
        }
        else if (method == 'create') {
            this.createProject(defaultVar);
        }
        else {
            (0, log_1.default)('Meyhod not found', log_1.Colors.Read);
        }
    }
    addService(serviceName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.default.existsSync(this.dir + '/package.json')) {
                return (0, log_1.default)('Can not find package.json', log_1.Colors.Read);
            }
            var folder = this.dir + '/services';
            var name = new name_1.default(serviceName);
            if (!fs_1.default.existsSync(folder)) {
                fs_1.default.mkdirSync(folder);
            }
            folder += '/' + name.lowerCase;
            if (fs_1.default.existsSync(folder)) {
                return (0, log_1.default)('Service exist', log_1.Colors.Read);
            }
            fs_1.default.mkdirSync(folder);
            var modelsFolder = folder + '/models/';
            fs_1.default.mkdirSync(modelsFolder);
            fs_1.default.writeFileSync(modelsFolder + name.lowerCase + 'Config.ts', files_1.default.serviceConfig(name));
            fs_1.default.writeFileSync(modelsFolder + 'userModel.ts', files_1.default.userModel);
            fs_1.default.writeFileSync(folder + '/index.ts', files_1.default.serviceIndex(name));
        });
    }
    createProject(name) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, log_1.default)('Create ' + name);
            yield this.execute('git -C ' + this.dir + ' clone https://github.com/origamiicore/oriseed.git');
            fs_1.default.rmSync(this.dir + '/oriseed/.git', { recursive: true, force: true });
            fs_1.default.renameSync(this.dir + '/oriseed', this.dir + '/' + name);
            yield this.execute('npm install --prefix  ' + this.dir + '/' + name);
            (0, log_1.default)('The ' + name + ' project was created successfully', log_1.Colors.Green);
        });
    }
    execute(command) {
        return new Promise((res, rej) => {
            exec(command).on('exit', () => {
                res();
            });
        });
    }
}
new OriTs();
//# sourceMappingURL=index.js.map