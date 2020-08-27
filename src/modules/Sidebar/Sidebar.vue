<template>
  <div :class="['sidebar', { '--open': this.plugin.sidebar.visible }]" :style="styles">
    <div class="__resizer" @mousedown="startResize"></div>
    <div class="sidebar___header-container">
      <div class="sidebar___header-wrapper">
        <div class="sidebar___title-container">
          <div class="sidebar___title-wrapper">
            <div class="sidebar___title-icon-container">
              <div class="sidebar___title-icon-wrapper">
                <i class="sidebar___title-icon">1</i>
              </div>
            </div>
            <div class="sidebar___title" title="">{{nodeName }}</div>
          </div>
        </div>
        <div
          role="button"
          title="Hide"
          tabindex="0"
          class="sidebar___close-container"
          @click="close"
        >
          <div class="sidebar___close-wrapper"> <!-- ToDo: import the svg-->
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
    </div>

    <portal-target name="sidebar" v-if="plugin"></portal-target>
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
} from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { ViewPlugin } from "../FlowGraph/components/plugin-renderer-vue/src";

@Component({
  methods: {
    ...mapGetters("flowData", ["getViewPlugin"]),
  },
  computed: {
    ...mapState("flowData", {
      initiated: "initiated",
      editor: "editor",
      plugin: "viewPlugin",
    }),
  },
})
export default class Sidebar extends Vue {
  minWidth: number = 100;
  width: number = 328;
  initiated!: Boolean;
  plugin!: ViewPlugin;

  get nodeName() {
    if (!this.plugin.sidebar.nodeId) return;

    const id = this.plugin.sidebar.nodeId;
    const n = this.plugin.editor.nodes.find((x) => x.id === id);
    return n ? n.name : "";
  }

  get styles() {
    return {
      width: this.width + "px",
    };
  }

  close() {
    this.plugin.sidebar.visible = false;
  }

  startResize() {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener(
      "mouseup",
      () => {
        window.removeEventListener("mousemove", this.onMouseMove);
      },
      { once: true }
    );
  }

  onMouseMove(event: MouseEvent) {
    const maxWidth = this.$parent.$el.getBoundingClientRect().width;
    this.width -= event.movementX;
    if (this.width < this.minWidth) {
      this.width = this.minWidth;
    } else if (this.width > 0.9 * maxWidth) {
      this.width = 0.9 * maxWidth;
    }
  }
}
</script>

<style  scoped>
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
  margin-right: 18px;
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

.sidebar___title {
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
  padding-left: 0;
  width: auto;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
</style>