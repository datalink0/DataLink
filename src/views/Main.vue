<template>
  <div class="main">
    <FlowGraph />
    <Sidebar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FlowGraph from "@/modules/FlowGraph";
import Sidebar from "@/modules/Sidebar";


@Component({
  components: {
    FlowGraph,
    Sidebar,
  },
})
export default class Main extends Vue {}
</script>

<style scoped>
  .main{
    display: flex;
    flex: 1 1 auto;
  }
</style>