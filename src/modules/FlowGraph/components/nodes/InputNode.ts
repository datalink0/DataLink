import { Node } from "../core/src";

export class InputNode extends Node {

    public type = "Input";
    public name = "InputNode";
    public twoColumn = true;
    public icon = "&fnof;";

    public constructor() {
        super();
        this.addOutputInterface("Output");
       // this.addOption("Value", "NumberOption", 0);
    }

    public calculate() {
        //this.setOptionValue("Value", this.getInterface("Input").value);
    }

}
