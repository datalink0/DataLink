import { Node } from "../../core/src";
import { default as store } from '@/store'
// @ts-ignore
import { Parser as FormulaParser } from "hot-formula-parser";

export class FunctionNode extends Node {

    public type = "Function";
    public name = "FunctionNode";
    public twoColumn = true;
    public icon = "&fnof;";


    public constructor() {
        super();
        this.addInputInterface("Input");
        this.addOutputInterface("Output");
        //Adding the sidebar component here to get its value for the calculate method
        this.addOption("Sidebar", "", "", "function_ui");
    }

    public calculate() {
        let tmpResult: any;
        let sidebarValue: string;
        let parser = new FormulaParser();

        console.log(store.state.flowData)

        sidebarValue = this.getOptionValue("Sidebar")
        tmpResult = parser.parse(sidebarValue).result;

        this.getInterface("Output").value = tmpResult;
        this.result = tmpResult;
    }

}