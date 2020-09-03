<template>
  <div class="sidebar___section-wrapper">
    <div class="sidebar___section-part">
      <div class="sidebar___section-block block-formula" role="region">
        <div class="sidebar___section-block-container">
          <div class="sidebar___body-block-wrapper">
            <div class="sidebar___section-block-key">formula</div>
            <div class="sidebar___formula-container">
              <div :class="classes">
                <input
                  class="sidebar___formula"
                  type="text"
                  v-model="formulaValue"
                  name="formula"
                  v-on="listeners"
                  autocomplete="off"
                  placeholder
                  v-on:keyup.enter="commitInput"
                />
                <button
                  class="sidebar____button buttton---cancel"
                  :style="styles"
                  @click="cancelInput"
                >
                  <font-awesome-icon class="fa-fw" :icon="['fas', 'times-circle',]" />
                </button>
                <button
                  class="sidebar____button buttton---commit"
                  :style="styles"
                  @click="commitInput"
                >
                  <font-awesome-icon class="fa-fw" :icon="['fas', 'check-circle']" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Editor } from "../../plugin-renderer-vue/src";
import { library } from "@fortawesome/fontawesome-svg-core";
// @ts-ignore
import { Parser as FormulaParser } from "hot-formula-parser";

//TODO: Create Vue Component for formula field
//FIXME: when we leave the component, the input will get reset

import {
  faTimes,
  faCheck,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { INode } from "../../core/types";
import { Node } from "../../core/src";
library.add(faTimes, faCheck, faCheckCircle, faTimesCircle);

@Component({})
export default class FunctionNodeUI extends Vue {
  @Prop({ default: "" })
  value!: string;
  @Prop()
  editor!: Editor;
  @Prop()
  node!: Node;

  private editing: boolean = false;
  private hasError: boolean = false;
  private temp: string = "";
  private parser = new FormulaParser();

  constructor() {
    super();
  }

  get styles() {
    return {
      display: !this.editing ? "none" : null,
    };
  }

  get classes() {
    return {
      sidebar___input: true,
      "sidebar___formula-wrapper": true,
      "sidebar___input---error": this.hasError,
    };
  }

  get formulaValue() {
    if (this.editing) return this.temp;
    return this.value;
  }

  set formulaValue(val: any) {
    if (this.editing) this.temp = val;
  }

  get listeners(): any {
    return {
      focus: (ev: any) => {
        if (this.editing == false) {
          this.editing = true;
          this.temp = this.value;
        }
      },
      input:(ev: any) => {
        if (this.editing == false) {
          // FIXME:
          this.editing = true;
          this.temp = this.value;
        }
      },
    };
  }

  commitInput() {
    if (this.validateInput()) {
      this.hasError = true;
    } else {
      this.$emit("input", this.temp.trim());
      this.resetTemp();
    }
  }

  cancelInput() {
    this.resetTemp();
  }

  resetTemp() {
    this.temp = "";
    this.editing = false;
    this.hasError = false;
  }

  // Check if the formula is valid
  validateInput() {
    // TODO: add an option to allow node names instead of just node id
    let connectedNodes: Map<INode, any[]> | undefined = this.node
      .getConnectionValueMap;

    this.parser.on("callVariable", function (name: String, done: Function) {  
      if (connectedNodes) {
        for (let node of connectedNodes.keys()) {
          if (node.id === name.trim()) {
            //set 1 so the parser just knows that formula works
            done(1);
            break;
          }
        }
      }
    });
    return this.parser.parse(this.temp).error;
  }
}
</script>

<style scoped>
.sidebar___formula-container {
  padding: 10px 0px 4px 0px;
}

.sidebar___formula-wrapper {
  width: 100%;
  padding: 10px 80px 8px 15px;
  border: solid 1px #dadce0;
  border-radius: 4px;
  box-shadow: inset -1px 0.2rem 0rem 0px rgba(0, 0, 0, 0.03);
  transition: all 0.1s ease-in-out;
  box-sizing: border-box;
  position: relative;
}

.sidebar___formula {
  line-height: 18px;
  font-size: 14px;
  border: none;
  width: 100%;
  background-color: transparent;
  outline: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: inherit;
  text-overflow:ellipsis;
}

.sidebar___formula-wrapper:focus-within {
  outline: #4285f4 auto 1px;
  background-color: #fefefe;
  transition: all 0.1s ease-in-out;
}

.sidebar___input button {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  line-height: 0;
  position: absolute;
  height: 100%;
  transition: all 200ms ease;
}

.sidebar___input button svg {
  color: #b3b3b3;
  padding: 10px 8px;
  font-size: 14px;
  transition: all 200ms ease;
}

.sidebar___input button:hover svg {
  color: #5f6368;
  transition: all 200ms ease;
}

.sidebar___input button:hover {
  outline: none;
  background-color: rgba(60, 64, 67, 0.08);
  transition: all 200ms ease;
}

.buttton---commit {
  right: 0;
  top: 0;
}

.buttton---cancel {
  right: 34px;
  top: 0;
}

.sidebar___input---error,
.sidebar___input---error:focus-within {
  outline: #dc3545 auto 2px;
}
</style>