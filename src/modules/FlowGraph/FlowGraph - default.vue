<template>
  <div class="flow-graph___container">
    <baklava-editor :plugin="viewPlugin"></baklava-editor>
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor } from "@/modules/FlowGraph/components/core/src";
import { ViewPlugin, BaklavaVuePlugin } from "@/modules/FlowGraph/components/plugin-renderer-vue/src";
import { OptionPlugin } from "@/modules/FlowGraph/components/plugin-options-vue/src";
import { Engine } from "@/modules/FlowGraph/components/plugin-engine/src";
import { InterfaceTypePlugin } from "@/modules/FlowGraph/components/plugin-interface-types/src";

import { FunctionNode, OutputNode, InputNode } from "@/modules/FlowGraph/components/nodes";
import "@/modules/FlowGraph/components/plugin-renderer-vue/src/styles/all.scss";

Vue.use(BaklavaVuePlugin);

export default {
  methods: {
    save() {
      this.state = this.editor.save();
    },
     load() {
      this.editor.load(this.state)
    },
  },
  data() {
    return {
      editor: new Editor(),
      engine: new Engine(true),
      viewPlugin: new ViewPlugin(),
      optionPlugin: new OptionPlugin(),
      intfTypePlugin: new InterfaceTypePlugin()
    };
  },
  created() {
    this.editor.use(this.optionPlugin);
    this.editor.use(this.viewPlugin);
    this.editor.use(this.engine);
    this.editor.use(this.intfTypePlugin);

    this.editor.registerNodeType("Input", InputNode);
    this.editor.registerNodeType("Output", OutputNode);
    this.editor.registerNodeType("Function", FunctionNode);
  },
  mounted() {},
};
</script>

<style scoped>

.flow-graph___container{
  width: 100%;
  height: 100%;
}

</style>