<template>
  <div class="sidebar___section-wrapper" v-if="data">
    <div class="sidebar___section-part">
      <div class="sidebar___section-block block-result" role="region">
        <div class="sidebar___section-block-container">
          <div class="sidebar___body-block-wrapper">
            <div class="sidebar___section-block-key">Result</div>
            <div class="sidebar___result-container">
              <div class="sidebar___result">{{result}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar___section-block block-details" role="region">
        <div class="sidebar___section-block-container">
          <div class="sidebar___body-block-wrapper">
            <div
              class="sidebar____list-row"
              :key="key"
              v-for="(value, key) in data.valuesForSidebar"
            >
              <div class="sidebar____list-row-key" :title="value">{{value}}:</div>
              <div
                class="sidebar____list-row-value"
                :title="valueParser(data[key])"
              >{{valueParser(data[key])}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar___section-block block-description" role="region">
        <div class="sidebar___section-block-container">
          <div class="sidebar___body-block-wrapper">
            <div class="sidebar___section-block-key">Description</div>
          </div>
          <div class="sidebar___description-container">
            <span
              class="sidebar___description"
              @click="edit(data.description)"
              v-if="!editing"
              :title="data.description"
            >{{data.description || "Add a description"}}</span>
            <textarea
              class="sidebar___description---edit"
              v-else
              v-model="temp"
              v-click-outside="() => (doneEditing(data,'description'))"
              @keydown.enter="() => (doneEditing(data, 'description'))"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- TODO: Add placeholder else statement -->
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
import { Node } from "@/modules/FlowGraph/components/core/src/node.ts";
import moment, { now } from "moment";
// @ts-ignore
import ClickOutside from "v-click-outside";
import { INodeInterface, INode } from "../FlowGraph/components/core/types";

@Component({
  name: "SidebarSection",
  components: {},
  methods: {
    ...mapGetters("flowData", ["selectedNode"]),
  },
  computed: {
    ...mapState("flowData", {
      data: "selectedNode",
    }),
  },
  directives: {
    ClickOutside: ClickOutside.directive,
  },
})
export default class SidebarSection extends Vue {
  data!: Node;
  temp: string = "";
  editing: boolean = false;

  constructor() {
    super();
  }

  valueParser(value: any) {
    if (!value) return "";

    if (moment.isMoment(value)) {
      if (moment().isSame(value, "d"))
        return `Today at ${value.local().format("LT")}`;

      return value.local().format("L");
    }
    return value;
  }

  edit(value: any) {
    this.temp = value;
    this.editing = true;
  }

  doneEditing(data: Node, key: string) {
    //TODO: check if field is empty

    (data as any)[key] = this.temp;
    this.editing = false;
  }

  get result(){
    return this.data.result;
  }
}
</script>

<style scoped>
/* Details */

.sidebar___section-wrapper {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  font-size: 13px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  width: 100%;
}

.sidebar___section-part {
  padding-bottom: 20px;
}

.sidebar___section-block {
  margin-top: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #dadce0;
}

.sidebar___section-block:last-child {
  border: none;
}

.sidebar___section-block-key {
  color: #8a8a8a;
  font-weight: bold;
  padding-bottom: 16px;
  text-transform: uppercase;
  display: block;
  width: 100%;
  font-size: 10.5px;
}

.sidebar___section-block-container {
  min-height: 32px;
  padding: 0 18px;
}

.sidebar___body-block-wrapper {
  padding: 0 8px;
}

.sidebar____list-row {
  line-height: 20px;
  padding: 6px 0;
  display: flex;
  border-bottom: 1px solid #eaeaea;
}

.sidebar____list-row:last-child {
  border: none;
}

.sidebar____list-row-key {
  -webkit-flex: 0 0 100px;
  flex: 0 0 100px;
  color: #5f6368;
  font-weight: bold;
}

.sidebar____list-row-value {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-flex: 0 1 auto;
  flex: 0 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar___description-container {
  color: #202124;
}

.sidebar___description {
  word-wrap: break-word;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
  cursor: pointer;
  padding: 8px;
  display: block;
  border-radius: 3px;
}

.sidebar___description:hover {
  background: #f3f3f4;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
}

.sidebar___description---edit {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  max-width: 100%;
  min-height: 50px;
  overflow: hidden;
  width: 100%;
  border-radius: 3px;
  outline: #4285f4 auto 1px;
  padding: 8px;
  color: inherit;
}

.sidebar___result-container {
  display: flex;
  justify-content: center;
}

.sidebar___result {
  font-size: 24px;
  color: #202124;
  line-height: 24px;
}
</style>