<template>
  <header>
    <div class="header-container">
      <div class="header-container__column header__left">
        <div class="header-container__logo__container">
          <div class="header-container__logo__wrapper">
            <a class="header-container__logo__link">
              <img src alt class="header-container__logo__image" />
              <span class="header-container__logo__title">DataLink</span>
            </a>
          </div>
        </div>
      </div>
      <div class="header-container__column header__middle"></div>
      <div class="header-container__column header__right"></div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Header extends Vue {}
</script>

<style scoped>
header {
  background-color: rgba(255, 255, 255, 1);
  font: 13px/27px Roboto, RobotoDraft, Arial, sans-serif;
  z-index: 986;
  color: black;
  min-width: 320px;
  position: relative;
  -webkit-transition: box-shadow 250ms;
  transition: box-shadow 250ms;
  border-bottom: 1px solid #dadce0;
  margin-top: -1px;
}

.header-container {
  padding: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  min-width: -webkit-min-content;
  min-width: min-content;
}

.header-container__column {
  height: 48px;
  vertical-align: middle;
  white-space: nowrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-user-select: none;
}

.header__left {
  padding-right: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-flex: 1 0 auto;
  flex: 1 0 auto;
}

.header-container__logo__container {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: relative;
  top: 2px;
}

.header-container__logo__wrapper {
  padding-left: 12px;
  line-height: normal;
  position: relative;
}

.header-container__logo__link {
  color: inherit;
  outline: none;
  display: inline-block;
  vertical-align: middle;
}

.header-container__logo__title {
  display: inline-block;
  font-family: "Product Sans", Arial, sans-serif;
  font-size: 22px;
  line-height: 24px;
  position: relative;
  top: -1.5px;
  vertical-align: middle;
  color: #5f6368;
  opacity: 1;
  padding-left: 4px;
}
</style>>

