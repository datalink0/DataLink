import { Editor } from "@/modules/FlowGraph/components/core/src";
import { ViewPlugin } from "@/modules/FlowGraph/components/plugin-renderer-vue/src";
import { OptionPlugin } from "@/modules/FlowGraph/components/plugin-options-vue/src";
import { Engine } from "@/modules/FlowGraph/components/plugin-engine/src";
import { InterfaceTypePlugin } from "@/modules/FlowGraph/components/plugin-interface-types/src";

import {
    FunctionNode,
    OutputNode,
    InputNode,
  } from "@/modules/FlowGraph/components/nodes";

const state = {
    initiated: false,
    editor: new Editor(),
    engine: new Engine(true),
    viewPlugin: new ViewPlugin(),
    optionPlugin: new OptionPlugin(),
    intfTypePlugin: new InterfaceTypePlugin()
};

const getters = {
    getEditor: (state: any) => state.editor,
    getViewPlugin: (state: any) => state.viewPlugin
};

const actions = {

    initiateEditor({commit}:any) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    state.editor.use(state.optionPlugin);
                    state.editor.use(state.viewPlugin);
                    state.editor.use(state.intfTypePlugin);
                    state.editor.use(state.engine);

                    state.editor.registerNodeType("Input", InputNode);
                    state.editor.registerNodeType("Output", OutputNode);
                    state.editor.registerNodeType("Function", FunctionNode);

                    commit('setInitiated');

                    resolve(true);
                }, 1000)
            } catch (error) {
                reject(false);
                throw error;
            }
        }).catch(error => {
            console.error(error);
            throw error;
        });
    },

};

const mutations = {
    setInitiated(state:any) {
        state.initiated = true;
    }
};


export default {
    namespaced:true, state, getters, actions, mutations
}; 