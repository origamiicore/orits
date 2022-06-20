"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Files {
    static serviceIndex(name) {
        return `import { DataInput, ModuleConfig, OriInjectable, OriService, PackageIndex, SessionInput } from "origamits";
import ${name.upperCase}Config from "./models/${name.lowerCase}Config";
import UserModel from './models/userModel';

@OriInjectable({domain:'${name.lowerCase}'})
export default class ${name.upperCase}Service implements PackageIndex
{
    name:string='${name.lowerCase}';
    config:${name.upperCase}Config;
    jsonConfig(moduleConfig: ModuleConfig): Promise<void> { 
        this.config=moduleConfig as ${name.upperCase}Config;
        return ;
    }
    start(): Promise<void> {
        return;
    }
    restart(): Promise<void> {
        return;
    }
    stop(): Promise<void> {
        return;
    }
    
    @OriService({isPublic:true})
    test(@SessionInput session,@DataInput({classType:UserModel})user:UserModel)
    {

    }
}`;
    }
    static serviceConfig(name) {
        return `import { ModuleConfig } from "origamits";

export default class ${name.upperCase}Config extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance=new ${name.upperCase}Service();
        await instance.jsonConfig(this);
        return instance;
    }
    dbContext:string;
    public constructor(
        
        fields?: {
            id?:string
            name?: string, 
            dbContext?:string  
        }) {

        super(fields);
        if (fields) Object.assign(this, fields);
    }
}`;
    }
}
exports.default = Files;
Files.userModel = `import { OriProps,IOriModel,OriModel } from "origamits"; 
@OriModel()
export default class UserModel extends IOriModel
{
    _id:string
    @OriProps({isRequired:true,})
    username:string;
    @OriProps({isRequired:true})
    password:string; 

    @OriProps({tags:'adminOnly'})
    wrongCount:number; 
    constructor(
        fields?: {
            _id?:string
            username?: string
            password?: string 
        })
    {
        super();  
        if (fields) 
        {
            Object.assign(this, fields); 
        }
    }
}`;
//# sourceMappingURL=files.js.map