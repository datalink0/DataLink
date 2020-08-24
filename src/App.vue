<template>
  <div class="view">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/modules/Header';

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {}
</script>

<style>
</style>
