<template>
  <header>
    <div class="header-container">
      <div class="header-container__column header__left">
        <div class="header-container__logo__container">
          <div class="header-container__logo__wrapper">
            <a class="header-container__logo__link">
              <VueLogo class="header-container__logo__image" />
              <span class="header-container__logo__title">DataLink</span>
            </a>
          </div>
        </div>
      </div>
      <div class="header-container__column header__middle"></div>
      <div class="header-container__column header__right">
        <div class="header-container__user__container header___button-container">
          <div class="header-container__user__wrapper header___button-wrapper">
            <a class="header___user-image-container">
              <UserIcon class="header___user-image" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//@ ts-ignore
import VueLogo from "@/assets/logo.svg";
import UserIcon from "@/assets/user.svg";

@Component({
  components: { VueLogo,UserIcon },
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

.header__right {
  /* padding-right: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-flex: 1 0 auto;
  flex: 1 0 auto; */

  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 48px;
  line-height: normal;
  padding: 0 4px;
  padding-left: 30px;
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: flex-end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}

.header___button-container {
  padding: 4px 2px;
  -webkit-flex: 0 1 auto;
  flex: 0 1 auto;
  display: inline-block;
  vertical-align: middle;
}

.header___button-wrapper {
  -webkit-flex: 0 1 auto;
  flex: 0 1 auto;
}

.header___user-image-wraper {
  color: #000;
  cursor: pointer;
  text-decoration: none;
  padding: 4px;
  -webkit-flex: 0 1 auto;
  flex: 0 1 auto;

  display: inline-block;
  outline: none;
  vertical-align: middle;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 40px;
  width: 40px;
  color: #000;
  cursor: pointer;
  text-decoration: none;
}

.header___user-image {
  -webkit-background-size: 32px 32px;
  background-size: 32px 32px;
  border: 0;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  display: block;
  margin: 0;
  position: relative;
  height: 42px;
  width: 42px;
  z-index: 0;
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

.header-container__logo__image {
  width: 40px;
  margin-bottom: 4px;
  padding-right: 4px;
  border: 0;
  vertical-align: middle;
}
</style>>

