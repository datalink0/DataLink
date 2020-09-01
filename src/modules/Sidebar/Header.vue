<template>
  <div class="sidebar___header-container" >
    <div class="sidebar___header-wrapper" v-if="data">
      <div class="sidebar___title-container">
        <div class="sidebar___title-wrapper">
          <div class="sidebar___title-icon-container">
            <div class="sidebar___title-icon-wrapper">
              <i class="sidebar___title-icon" v-html="data.icon"></i>
            </div>
          </div>
          <div class="sidebar___title" @click="rename" v-if="!renaming" :title="data.name">{{data.name}}</div>
          <input
            v-else
            type="text"
            :class="['sidebar___title---input']"
            v-model="tempName"
            placeholder="Name"
            v-click-outside="doneRenaming"
            @keydown.enter="doneRenaming"
          />
        </div>
      </div>
      <div role="button" title="Hide" tabindex="0" class="sidebar___close-container" @click="close">
        <div class="sidebar___close-wrapper">
          <!-- ToDo: import the svg-->
          <svg
            class="sidebar___close"
            x="0px"
            y="0px"
            width="14px"
            height="14px"
            viewBox="0 0 10 10"
            focusable="false"
            fill="#000000"
          >
            <polygon
              points="10,1.01 8.99,0 5,3.99 1.01,0 0,1.01 3.99,5 0,8.99 1.01,10 5,6.01 8.99,10 10,8.99 6.01,5 "
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="sidebar___header-navigation-container">
      <div class="sidebar___header-navigation-wrapper">
        <div
          @click="selectNavigation(nav)"
          :class="classes(nav)"
          :key="nav"
          v-for="nav in ['Details', 'Options']"
        >
          <div class="sidebar___navigation-element-border-wrapper">
            <div class="sidebar___navigation-element-border"></div>
          </div>
          {{nav}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Inject,
  Watch,
  Model,
  Provide,
} from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { ViewPlugin } from "../FlowGraph/components/plugin-renderer-vue/src";
import { Node } from "@/modules/FlowGraph/components/core/src/node.ts";
// @ts-ignore
import ClickOutside from "v-click-outside";

@Component({
  name: "SidebarHeader",
  components: {
    SidebarHeader,
  },
  methods: {
    ...mapGetters("flowData", ["getSelectedNode"]),
  },
  computed: {
    ...mapState("flowData", {
      data: "selectedNode",
      plugin: "viewPlugin",
    }),
  },
  directives: {
    ClickOutside: ClickOutside.directive,
  },
})
export default class SidebarHeader extends Vue {
  @Provide("plugin")
  plugin!: ViewPlugin;

  data!: Node;
  renaming: Boolean = false;
  tempName: string = "";
  selected: string = "Details";

  classes(name: string) {
    return {
      "sidebar___navigation-element": true,
      selected: this.selected == name,
    };
  }

  selectNavigation(name: string) {
    this.$emit("select", name);
    this.selected = name;
  }

  rename() {
    if (!this.data) return;

    this.tempName = this.data.name;
    this.renaming = true;
  }

  doneRenaming() {
    //TODO: check if field is empty

    this.data.name = this.tempName;
    this.renaming = false;
  }

  close() {
    this.plugin.sidebar.visible = false;
    this.plugin.sidebar.active = false;
  }

  //Check if node got deleted to close it
  @Watch("data")
  checkIfDeleted() {
    if (this.data == null) this.close();
  }
}
</script>

<style scoped>
/* Head  */

.sidebar___header-container {
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
  background-color: rgba(0, 0, 0, 0);
  border-left: 1px solid transparent;
  margin: 0 0 0 -1px;
  padding-top: 8px;
}

.sidebar___header-wrapper {
  -webkit-align-items: flex-start;
  align-items: flex-start;
  -webkit-flex-direction: row;
  flex-direction: row;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 24px;
  min-height: 64px;
  padding: 20px 0;
  position: relative;
}

.sidebar___title-container {
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  margin-left: 24px;
  max-width: -webkit-calc(100% - 80px);
  max-width: calc(100% - 80px);
  width: -webkit-calc(100% - 80px);
  width: calc(100% - 80px);
}

.sidebar___title-wrapper {
  -webkit-flex-direction: row;
  flex-direction: row;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  cursor: pointer;
  height: 100%;
  position: relative;
}

.sidebar___title-icon-container {
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
  display: inline-block;
  line-height: 24px;
  margin-right: 10px;
  text-align: center;
}

.sidebar___title-icon-wrapper {
  height: 24px;
  width: 24px;
}

.sidebar___title-icon {
  height: 24px;
  width: 24px;
}

.sidebar___title, .sidebar___title---input {
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 22px;
  font-variant-ligatures: no-contextual;
  font-weight: 400;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #202124;
  display: inline-block;
  line-height: 24px;
  overflow: hidden;
  padding: 3px 0px 3px 4px;
  width: auto;
  border-radius: 4px;
  word-wrap: break-word;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
}

.sidebar___title---input:hover{
  background: white;
}

.sidebar___title:hover {
  background: #f3f3f4;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
}

.sidebar___title---input {
  outline: #4285f4 auto 1px;
  border: transparent;
}

.sidebar___close-container {
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
  cursor: pointer;
  height: 24px;
  margin: 0 24px 0 8px;
  opacity: 0.5;
  position: relative;
  right: 0;
  top: 0;
  width: 24px;
}

.sidebar___close-wrapper {
  bottom: 7px;
  left: 7px;
  right: 7px;
  top: 7px;
}

.sidebar___close {
  padding: 5px;
}

.sidebar___header-navigation-wrapper {
  border-bottom: 1px solid #dadce0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 0 8px;
  list-style: none;
  cursor: default;
  outline: none;
}

.sidebar___navigation-element {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-variant-ligatures: no-contextual;
  font-weight: 400;
  color: #5f6368;
  cursor: pointer;
  display: inline-block;
  -webkit-box-flex: 1 1 auto;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  height: 48px;
  line-height: 48px;
  outline: none;
  padding: 0 8px;
  position: relative;
  text-align: center;
}

.selected {
  color: #4285f4;
  cursor: default;
  font-weight: 600;
}

.sidebar___navigation-element-border-wrapper {
  bottom: 0;
  height: 2px;
  left: 8px;
  padding: 0;
  position: absolute;
  right: 8px;
}

.sidebar___navigation-element-border {
  width: 100%;
}

.sidebar___navigation-element:hover .sidebar___navigation-element-border {
  border-bottom: 3px solid #5f6368;
}

.sidebar___navigation-element.selected .sidebar___navigation-element-border {
  border-bottom: 3px solid #4285f4;
}
</style>