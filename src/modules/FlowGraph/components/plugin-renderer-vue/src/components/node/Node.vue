<template>
  <div :id="data.id" :class="classes" :style="styles" @click="openSidebar">
    <!-- Inputs -->
    <div class="__inputs">
      <component
        :is="plugin.components.nodeInterface"
        v-for="(input, name) in data.inputInterfaces"
        :key="input.id"
        :name="name"
        :data="input"
      ></component>
    </div>
    <div class="node___wrapper">
      <div
        class="node___title-container"
        @mousedown="startDrag"
        @contextmenu.self.prevent="openContextMenu"
      >
        <div class="node___icon-wrapper">
          <i class="node___icon" v-html="data.icon"></i>
        </div>
        <div class="__title" :title="data.name">
          <span>{{ data.name }}</span>
        </div>
      </div>

      <!-- TODO: Open Sidebar on Click -->
      <!-- Content -->
      <div class="__content">
        <!-- Options -->
        <div class="__options">
          <template v-for="[name, option] in data.options">
            <component
              :is="plugin.components.nodeOption"
              :key="name"
              :name="name"
              :option="option"
              :componentName="option.optionComponent"
              :node="data"
              @openSidebar="openSidebar(name)"
            ></component>
            <portal
              :key="'sb_' + name"
              to="sidebar"
              v-if="plugin.sidebar.nodeId === data.id && plugin.sidebar.optionName === name && option.sidebarComponent"
            >
              <component
                :is="plugin.components.nodeOption"
                :key="data.id + name"
                :name="name"
                :option="option"
                :componentName="option.sidebarComponent"
                :node="data"
              ></component>
            </portal>
          </template>
        </div>
      </div>
    </div>

    <!-- Outputs -->
    <div class="__outputs">
      <component
        :is="plugin.components.nodeInterface"
        v-for="(output, name) in data.outputInterfaces"
        :key="output.id"
        :name="name"
        :data="output"
      ></component>
    </div>

    <component
      :is="plugin.components.contextMenu"
      v-model="contextMenu.show"
      :x="contextMenu.x"
      :y="contextMenu.y"
      :items="contextMenu.items"
      @click="onContextMenu"
    ></component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject, Watch } from "vue-property-decorator";
import { VueConstructor } from "vue";

// @ts-ignore
import ClickOutside from "v-click-outside";

import { ViewPlugin } from "../../viewPlugin";
import { IViewNode } from "../../../types";
import { sanitizeName } from "../../utility/cssNames";

@Component({
  directives: {
    ClickOutside: ClickOutside.directive,
  },
})
export default class NodeView extends Vue {
  @Prop({ type: Object })
  data!: IViewNode;

  @Prop({ type: Boolean, default: false })
  selected!: boolean;

  @Inject("plugin")
  plugin!: ViewPlugin;


  dragging = false;
  tempName = "";

  contextMenu = {
    show: false,
    x: 0,
    y: 0,
    items: [{ value: "delete", label: "Delete" }],
  };

  private unsubscribe: (() => void) | null = null;

  get classes() {
    return {
      node: true,
      "--selected": this.selected,
      "--dragging": this.dragging,
      "--two-column": !!this.data.twoColumn,
      [`--type-${sanitizeName(this.data.type)}`]: true,
    };
  }

  get styles() {
    return {
      top: `${this.data.position.y}px`,
      left: `${this.data.position.x}px`,
      width: `${this.data.width}px`,
      "background-color": this.data.color,
    };
  }

  mounted() {
    this.data.events.addInterface.addListener(this, () => this.update());
    this.data.events.removeInterface.addListener(this, () => this.update());
    this.data.events.addOption.addListener(this, () => this.update());
    this.data.events.removeOption.addListener(this, () => this.update());
    this.plugin.hooks.renderNode.execute(this);
  }

  updated() {
    this.plugin.hooks.renderNode.execute(this);
  }

  beforeDestroy() {
    this.data.events.addInterface.removeListener(this);
    this.data.events.removeInterface.removeListener(this);
    this.data.events.addOption.removeListener(this);
    this.data.events.removeOption.removeListener(this);
  }

  update() {
    this.$forceUpdate();
  }

  startDrag() {
    this.dragging = true;
    document.addEventListener("mousemove", this.handleMove);
    document.addEventListener("mouseup", this.stopDrag);
    this.select();
  }

  select() {
    this.$emit("select", this);
    this.$store.commit('flowData/setSelectedNode', this.data);
  }

  stopDrag() {
    this.dragging = false;
    document.removeEventListener("mousemove", this.handleMove);
    document.removeEventListener("mouseup", this.stopDrag);
  }

  handleMove(ev: MouseEvent) {
    if (this.dragging) {
      this.data.position.x += ev.movementX / this.plugin.scaling;
      this.data.position.y += ev.movementY / this.plugin.scaling;
    }
  }

  openSidebar() {
    this.plugin.sidebar.nodeId = this.data.id;
    this.plugin.sidebar.optionName = "Sidebar";
    this.plugin.sidebar.visible = true;
  }

  openContextMenu(ev: MouseEvent) {
    this.contextMenu.show = true;
    this.contextMenu.x = ev.offsetX;
    this.contextMenu.y = ev.offsetY;
  }

  onContextMenu(action: string) {
    switch (action) {
      case "delete":
        this.plugin.editor.removeNode(this.data);
        break;
    }
  }
}
</script>
