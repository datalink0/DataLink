<template>
  <div class="sidebar" :style="styles">
    <div :class="classes">
      <div class="__resizer" @mousedown="startResize"></div>
      <div class="sidebar___flex-wrapper">
        <SidebarHeader @select="selectNav($event)" />
        <div class="sidebar___body-container">
          <div class="sidebar___body-wrapper">
            <div class="sidebar___section" role="tab" :style="selectSection('Details')">
              <SidebarSection />
            </div>
            <div class="sidebar___section" role="tab" :style="selectSection('Options')">
              <keep-alive name="sidebar">
                <portal-target name="sidebar"></portal-target>
              </keep-alive>
            </div>
          </div>
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

import SidebarHeader from "./Header.vue";
import SidebarSection from "./Section.vue";

@Component({
  name: "Sidebar",
  components: {
    SidebarHeader,
    SidebarSection,
  },
  methods: {
    ...mapGetters("flowData", ["getViewPlugin"]),
  },
  computed: {
    ...mapState("flowData", {
      plugin: "viewPlugin",
    }),
  },
})
export default class Sidebar extends Vue {
  minWidth: number = 100;
  width: number = 328;
  selectedNav: String = "Details";

  @Provide("plugin")
  plugin!: ViewPlugin;

  public constructor() {
    super();
  }

  get styles() {
    return {
      width: this.width + "px",
      display: !this.plugin.sidebar.visible ? "none" : null,
    };
  }

  selectSection(name: string) {
    return { display: !(this.selectedNav == name) ? "none" : null };
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

  selectNav(name: String) {
    this.selectedNav = name;
  }

  get classes() {
    return {
      sidebar___wrapper: true,
    };
  }
}
</script>


<style lang="scss"  scoped>
.sidebar {
  height: 100%;
  flex: 0 0 auto;
  min-width: 5%;
  max-width: 90%;
  position: relative;

  .sidebar___wrapper {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-flex: 0 0 auto;
    flex: 0 0 auto;
    background-color: transparent;
    height: 100%;
    overflow: hidden;
    right: 0;
    top: 0;
    z-index: 4;
    border-left: 1px solid #dadce0;
  }

  & .__resizer {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    cursor: col-resize;
  }

  & .__close {
    font-size: 2em;
    border: none;
    background: none;
    color: rgb(161, 161, 161);
    cursor: pointer;
  }

  .sidebar___flex-wrapper {
    -webkit-flex-direction: column;
    flex-direction: column;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;
    max-width: 100%;
  }

  .sidebar___body-container {
    flex: 1 1 auto;
    position: relative;
  }

  .sidebar___body-wrapper {
    background-color: #fff;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .sidebar___section {
    height: 100%;
    width: 100%;
  }
}
</style>