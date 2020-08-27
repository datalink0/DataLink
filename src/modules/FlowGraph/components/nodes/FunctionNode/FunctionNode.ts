import { Node } from "../../core/src";
import { default as SidebarUI } from "./sidebar_ui.vue";

export class FunctionNode extends Node {

    public type = "Function";
    public name = "FunctionNode";
    public twoColumn = true;
    public icon = "&fnof;";
    public sidebarComponent = SidebarUI;


    constructor() {
        super();

        //this.viewPlugin.registerOption("SidebarOption", SidebarOption);
        

        this.addInputInterface("Input",undefined, undefined, { type: "number" });
        this.addOutputInterface("Output", { type: "number" });
        this.addOption("Value", "NumberOption",0);
        //this.addOption("Operation", "SelectOption", "Add", undefined, {selected: "Add", items: [ "Add", "Subtract" ] });
        this.addOption("SidebarTest", "",0, "NumberOption");

        console.log(this)
    }

    public calculate() {

        console.log(this.sidebarComponent)

         const result = this.getOptionValue("Value");
         const a = this.getInterface("Input").value;

         console.log(a)
        
        // const operation = this.getOptionValue("Operation");

        // let result:number = 0;
        // if (operation === "Add") {
        //     result = n1 + n2;
        // } else if (operation === "Subtract") {
        //     result = n1 - n2;
        // }

         this.getInterface("Output").value = result;
    }

}