import { IPlugin, IEditor, INode } from "../../core/types";
import { IHook } from "../../events/types";

export interface IViewNode extends INode {
    position: { x: number, y: number };
    width: number;
    disablePointerEvents: boolean;
    twoColumn: boolean;
    color: string;
}

export interface IViewPlugin extends IPlugin {

    editor: IEditor;
    panning: { x: number, y: number };
    scaling: number;
    sidebar: { visible: boolean, nodeId: string, optionName: string, active: boolean };

    // TODO: Don't want to import Vue here, unless we can only import the type
    // options: Record<string, VueConstructor>;
    options: Record<string, any>;

    hooks: {
        renderNode: IHook<any>,
        renderOption: IHook<any>,
        renderInterface: IHook<any>,
        renderConnection: IHook<any>
    };

    // TODO: same reason as above
    // registerOption(name: string, component: VueConstructor)
    registerOption(name: string, component: any): void;

}
