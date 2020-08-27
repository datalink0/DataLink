import { Node } from "../core/src";

export class FunctionNode extends Node {

    public type = "Function";
    public name = "FunctionNode";
    public twoColumn = true;
    public icon = "&fnof;";

    constructor() {
        super();
        this.addInputInterface("Input",undefined, undefined, { type: "number" });
        this.addOutputInterface("Output", { type: "number" });
        this.addOption("Value", "NumberOption",0);
        //this.addOption("Operation", "SelectOption", "Add", undefined, {selected: "Add", items: [ "Add", "Subtract" ] });
        this.addOption("SidebarTest", "ButtonOption","this is a test", "TextOption");
    }

    public calculate() {
        
        // const n1:number = this.getInterface("Input").value || 0;
        // const n2:number = this.getOptionValue("Value");
        // const operation = this.getOptionValue("Operation");

        // let result:number = 0;
        // if (operation === "Add") {
        //     result = n1 + n2;
        // } else if (operation === "Subtract") {
        //     result = n1 - n2;
        // }

        // this.getInterface("Output").value = result;
    }

}

    // this.addInputInterface("Input",undefined, undefined, { type: "number" });
        // this.addOutputInterface("Output", { type: "number" });