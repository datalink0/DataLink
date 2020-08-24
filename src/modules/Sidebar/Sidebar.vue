<template>
    <div :class="['sidebar', '--open']" :style="styles">
        
        <div class="__resizer" @mousedown="startResize"></div>

        <div class="d-flex align-items-center">
            <button tabindex="-1" class="__close" @click="close">&times;</button>
            <div class="ml-2"><b>{{  }}</b></div>
        </div>

        <portal-target name="sidebar"></portal-target>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from "vue-property-decorator";
import { ViewPlugin } from "@/modules/FlowGraph/components/plugin-renderer-vue/src/viewPlugin.ts";

@Component
export default class Sidebar extends Vue {
 
    readonly minWidth :number = 100;
    width :number = 300;

    @Inject("plugin")
    plugin!: ViewPlugin;

    get nodeName() {
        const id = this.plugin.sidebar.nodeId;
        const n = this.plugin.editor.nodes.find((x) => x.id === id);
        return n ? n.name : "";
    }

    get styles() {
        return {
            width: this.width + "px"
        };
    }

    close() {
        this.plugin.sidebar.visible = false;
    }

    startResize() {
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", this.onMouseMove);
        }, { once: true });
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

<style lang="scss" scoped>

</style>