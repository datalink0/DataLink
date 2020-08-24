import { Node } from "../core/src";

export class OutputNode extends Node {

    public type = "Output";
    public name = "OutputNode";
    public twoColumn = true;
    public icon = "&fnof;";

    public constructor() {
        super();
        this.addInputInterface("Input");
       // this.addOption("Value", "NumberOption", 0);
    }

    public calculate() {
        //this.setOptionValue("Value", this.getInterface("Input").value);
    }

}
