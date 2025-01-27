<template>
  <div :class="[mode]" class="card fc1 bs">
    <div class="header row">
      <div class="mode">{{ mode }}</div>
      <div class="plot"><img class="icon" :src="images.zone" /></div>
      <div class="harvest" :title="descriptions.harvest"><img class="icon" :src="images.harvest" /></div>
      <div class="shelf" :title="descriptions.shelf"><img class="icon" :src="images.shelf" /></div>
    </div>
    <template v-for="(rc, crop) of result" :key="crop">
      <template v-for="(rs, soil) of rc" :key="soil">
        <div class="row" v-if="rs.farmingPlots?.[0]">
          <img class="icon" :src="cropImages[crop]" />
          <div class="soil">{{ soil }}</div>
          <div class="plot">{{ rs.farmingPlots[0] }}</div>
          <div class="harvest">{{ rs.farmingPlots[1] }}</div>
          <div class="shelf">{{ Math.ceil(rs.farmingPlots[2]) }}</div>
        </div>
      </template>
    </template>
    <div class="separator" v-if="isObjectNotEmpty(drugResult)"></div>
    <template v-for="(rc, crop) of drugResult" :key="crop">
      <template v-for="(rs, soil) of rc" :key="soil">
        <div class="row" v-if="rs.plots[0]">
          <img class="icon" :src="cropImages[crop]" />
          <div class="soil">{{ soil }}</div>
          <div class="plot">{{ rs.plots[0] }}</div>
          <div class="harvest">{{ rs.plots[1] }}</div>
          <div class="shelf">{{ Math.ceil(rs.plots[2]) }}</div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { images } from '~/lib/rimworldData'
import { cropImages, descriptions } from '~/lib/rimworldLib'

defineProps(['mode', 'result', 'drugResult'])
</script>

<style lang="scss"></style>