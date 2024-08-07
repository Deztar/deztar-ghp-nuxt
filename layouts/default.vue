<template>
  <div id="default">
    <slot />
    <AppFooter class="footer" />
  </div>
</template>

<script setup lang="ts">
// Will load after component css, bad
//import '~/assets/css/base.scss'
</script>

<style lang="scss">
@import '@css/base.scss';

#default {
  min-height: calc(100vh - 1ch);
  display: flex;
  flex-direction: column;

  &>*:first-child {
    flex-grow: 1;
  }

  .footer {
    align-self: center;
    margin-top: auto;
    margin-bottom: 1ch;
  }
}
</style>
