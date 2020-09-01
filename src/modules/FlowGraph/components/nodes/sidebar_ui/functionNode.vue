<template>
    <div>
        <h1>Sidebar Option</h1>
        <p>This is an advanced option</p>
        <p>{{ value }}</p>
        <input
            type="text"
            :value="value"
            v-on="listeners"
            @click="emit"
        >
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputOption } from "../../plugin-options-vue/src";
@Component({
    components: { InputOption }
})
export default class FunctionNodeUI extends Vue {
    
    get sanitized() {
        return String(this.value);
    }

    @Prop({ default: "" })
    value!: string;

    emit(){
        this.$emit('input','hallo')
    }

    get listeners(): any {
        return { ...this.$listeners, input: (ev: any) => this.$emit("input", ev.target.value) };
    }
}
</script>