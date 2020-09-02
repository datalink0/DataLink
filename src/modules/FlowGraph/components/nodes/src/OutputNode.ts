import { Node } from "../../core/src";

export class OutputNode extends Node {

    public type = "Output";
    public name = "OutputNode";
    public twoColumn = true;
    public icon = "&fnof;";

    public constructor() {
        super();
        this.addInputInterface("Input");
    }

    public calculate() {
        //TODO: fix it
        this.result = this.getInterface("Input").value
        console.log(this.getInterface("Input").value)
    }

}
