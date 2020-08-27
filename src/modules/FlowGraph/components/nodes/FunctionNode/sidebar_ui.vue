<template>
    <div>
        <h1>Sidebar Option</h1>
        <p>This is an advanced option</p>
        <p>{{ value }}</p>
        <input-option v-model="value"></input-option>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputOption } from "../../plugin-options-vue/src";
@Component({
    components: { InputOption }
})
export default class SidebarUI extends Vue {
    //@Prop()
    value: any = "";
}
</script>