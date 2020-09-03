import { IBaklavaEvent, IPreventableBaklavaEvent, IHook } from "../../events/types";
import { IAddInterfaceEventData, IAddOptionEventData, IOptionEventData, INodeUpdateEventData } from "./eventDataTypes";
import { INodeInterface } from "./nodeInterface";
import { INodeOption } from "./nodeOption";
import { INodeState } from "./state";
import { IEditor } from "./editor";

export interface INode {

    type: string;
    name: string;
    id: string;
    icon: string;
    interfaces: Map<string, INodeInterface>;
    options: Map<string, INodeOption>;
    state: Record<string, any>;
    result: String | Number;
    createdDate: moment.Moment;
    lastModifiedDate: moment.Moment;
    createdById: String;
    lastMOdifiedByID: String;
    description: String;
    valuesForSidebar: Record<string, String> ;

    events: {
        beforeAddInterface: IPreventableBaklavaEvent<IAddInterfaceEventData>,
        addInterface: IBaklavaEvent<INodeInterface>,
        beforeRemoveInterface: IPreventableBaklavaEvent<INodeInterface>,
        removeInterface: IBaklavaEvent<INodeInterface>,
        beforeAddOption: IPreventableBaklavaEvent<IAddOptionEventData>,
        addOption: IBaklavaEvent<IOptionEventData>,
        beforeRemoveOption: IPreventableBaklavaEvent<IOptionEventData>,
        removeOption: IBaklavaEvent<IOptionEventData>,
        update: IBaklavaEvent<INodeUpdateEventData>
    };

    hooks: {
        load: IHook<INodeState>,
        save: IHook<INodeState>
    };

    inputInterfaces: Record<string, INodeInterface>;
    outputInterfaces: Record<string, INodeInterface>;

    load(state: INodeState): void;
    save(): INodeState;
    calculate(calculationData?: any): any;
    getInterface(name: string): INodeInterface;
    getOptionValue(name: string): any;
    setOptionValue(name: string, value: any): void;
    registerEditor(editor: IEditor): void;
}
