import { Editor } from "@/modules/FlowGraph/components/core/src";
import { ViewPlugin } from "@/modules/FlowGraph/components/plugin-renderer-vue/src";
import { OptionPlugin } from "@/modules/FlowGraph/components/plugin-options-vue/src";
import { Engine } from "@/modules/FlowGraph/components/plugin-engine/src";
import { InterfaceTypePlugin } from "@/modules/FlowGraph/components/plugin-interface-types/src";
import { Node } from "@/modules/FlowGraph/components/core/src/node.ts";

import {
    FunctionNode,
    OutputNode,
    FunctionNodeUI
} from "@/modules/FlowGraph/components/nodes";

// TODO: put in type file 

interface IState extends Record<string, any> {
    initiated: Boolean,
    selectedNode: Node | null,
    editor: Editor,
    engine: Engine,
    viewPlugin: ViewPlugin,
    optionPlugin: OptionPlugin,
    intfTypePlugin: InterfaceTypePlugin
}

const state: IState = {
    initiated: false,
    selectedNode: null,
    editor: new Editor(),
    engine: new Engine(true),
    viewPlugin: new ViewPlugin(),
    optionPlugin: new OptionPlugin(),
    intfTypePlugin: new InterfaceTypePlugin()
};

const getters = {
    getEditor: (state: any) => state.editor,
    getViewPlugin: (state: any) => state.viewPlugin,
    getSelectedNode: (state: any) => state.selectedNode
};

const actions = {

    initiateEditor({ commit }: any) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    state.editor.use(state.optionPlugin);
                    state.editor.use(state.viewPlugin);
                    state.editor.use(state.intfTypePlugin);
                    state.editor.use(state.engine);

                    // register interface types
                    state.intfTypePlugin.addType("number", "");

                    // register our node types
                    state.editor.registerNodeType("Output", OutputNode);
                    state.editor.registerNodeType("Function", FunctionNode);

                    // register our options and siebars
                    state.viewPlugin.registerOption("function_ui", FunctionNodeUI);

                    commit('setInitiated');
                    resolve();
                }, 1000)
            } catch (error) {
                reject();
                throw error;
            }
        }).catch(error => {
            console.error(error);
            throw error;
        });
    },

};

const mutations = {
    setInitiated(state: any) {
        state.initiated = true;
    },
    setSelectedNode(state: any, node: Node) {
        state.selectedNode = node;
    }
};


export default {
    namespaced: true, state, getters, actions, mutations
}; 