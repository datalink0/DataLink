<template>
  <div class="flow-graph___container">
    <baklava-editor v-if="initiated == true" :plugin="this.viewPlugin"></baklava-editor>
  </div>
</template>

<script>
import Vue from "vue";
import { BaklavaVuePlugin } from "@/modules/FlowGraph/components/plugin-renderer-vue/src";

import { mapGetters, mapActions, mapState} from "vuex";
import "@/modules/FlowGraph/components/plugin-renderer-vue/src/styles/all.scss";

Vue.use(BaklavaVuePlugin);

export default {
  methods: {
    save() {
      this.state = this.editor.save();
    },
    load() {
      this.editor.load(this.state);
    },
    ...mapActions("flowData", ["initiateEditor"]),
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState("flowData", ["initiated", "editor", "viewPlugin"]),
  },
  created() {
    this.initiateEditor();
  },
};
</script>

<style scoped>
.flow-graph___container {
  width: 100%;
  height: 100%;
}
</style>