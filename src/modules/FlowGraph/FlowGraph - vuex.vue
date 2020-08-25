<template>
  <div class="flow-graph___container">
    <baklava-editor :plugin="{getViewPlugin}"></baklava-editor>
  </div>
</template>

<script>
import Vue from "vue";
import {
  
  BaklavaVuePlugin,
} from "@/modules/FlowGraph/components/plugin-renderer-vue/src";

import { mapGetters, mapActions } from "vuex";
import {
  FunctionNode,
  OutputNode,
  InputNode,
} from "@/modules/FlowGraph/components/nodes";
import "@/modules/FlowGraph/components/plugin-renderer-vue/src/styles/all.scss";

//Vue.use(BaklavaVuePlugin);

export default {
  methods: {
    save() {
      this.state = this.editor.save();
    },
    load() {
      this.editor.load(this.state);
    },
    ...mapActions(["initiateEditor"]),
    ...mapGetters(["getEditor", "getViewPlugin"])
  },
  data() {
    return {
      editor: this.$store.state.editor,
      engine: this.$store.state.engine,
      viewPlugin: this.$store.state.viewPlugin,
      optionPlugin: this.$store.state.optionPlugin,
      intfTypePlugin: this.$store.state.intfTypePlugin,
    };
  },
  computed: {
    //...mapGetters(["getViewPlugin"])
    
  },
  created() {
    this.initiateEditor()
      .then((result) => {
        this.editor = this.getEditor();
        this.viewPlugin = this.getViewPlugin();

        this.editor.registerNodeType("Input", InputNode);
        this.editor.registerNodeType("Output", OutputNode);
        this.editor.registerNodeType("Function", FunctionNode);

        console.log(this.editor);
        console.log(this.viewPlugin);

        Vue.use(BaklavaVuePlugin);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
.flow-graph___container {
  width: 100%;
  height: 100%;
}
</style>