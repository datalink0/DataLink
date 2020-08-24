import { IBaklavaEvent, IPreventableBaklavaEvent } from "../../events/types";

export interface INodeOption {

    /** Additional Properties */
    [k: string]: any;

    optionComponent: string;
    value: any;
    sidebarComponent?: string;

    events: {
        beforeSetValue: IPreventableBaklavaEvent<any>,
        setValue: IBaklavaEvent<any>
    };

}
