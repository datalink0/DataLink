import { Node } from "../../core/src";
import { default as store } from '@/store'
// @ts-ignore
import { Parser as FormulaParser } from "hot-formula-parser";
import { INode } from '../../core/types/node';

export class FunctionNode extends Node {

    public type = "Function";
    public name = "FunctionNode";
    public twoColumn = true;
    public icon = "&fnof;";

    private parser = new FormulaParser();


    public constructor() {
        super();
        this.addInputInterface("Input", undefined, 0, { type: "number" });
        this.addOutputInterface("Output", { type: "number" });

        //Adding the sidebar component here to get its value for the calculate method
        this.addOption("Sidebar", "", "", "function_ui");
    }

    public calculate() {
        let sidebarValue: string = this.getOptionValue("Sidebar")
        this.result =  parseFloat(this.parseFormula(sidebarValue) || 0);
        this.getInterface("Output").value = this.result;
    }

    private parseFormula(formula: string) {
        let connectedNodes: Map<INode, any[]> | undefined = this
            .getConnectionValueMap;

        //replace variable names with values
        this.parser.on("callVariable", function (name: String, done: Function) {
            if (connectedNodes) {
                for (let [key, value] of connectedNodes.entries()){
                    if (key.id === name){
                    //FIXME: 0 because we only serve one outputs at the moment
                      done(value[0]);
                      break;
                    }  
                }
            }
        });

        return this.parser.parse(formula).result;
    }

}