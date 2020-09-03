import { Node } from "../../core/src";
import { INode } from '../../core/types';

export class OutputNode extends Node {

    public type = "Output";
    public name = "OutputNode";
    public twoColumn = true;
    public icon = "&fnof;";


    public constructor() {
        super();
        this.addInputInterface("Input", undefined, 0, { type: "number" });
    }

    public calculate() {
        let sum: Number = 0;
        let valueMap: Map<INode, any[]> | undefined = this.getConnectionValueMap;

        if (valueMap) {
            for (let values of valueMap.values()) {
                for (let value of values) {
                    sum += value;
                }
            }
        }
        this.result = sum;
    }

}
