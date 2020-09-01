import { Node } from "../../core/src";
import {default as store} from '@/store'

export class FunctionNode extends Node {

    public type = "Function";
    public name = "FunctionNode";
    public twoColumn = true;
    public icon = "&fnof;";


    public constructor() {
        super();

        this.addInputInterface("Input");
        this.addOutputInterface("Output");
        this.addOption("Value", "NumberOption",0);

        //Adding the sidebar component here to get its value for the calculate method
        this.addOption("Sidebar", "","", "function_ui");
    }

    public calculate() {
        
        this.getInterface("Output").value = this.getOptionValue("Value");
        this.result =  this.getOptionValue("Value");
    }

}