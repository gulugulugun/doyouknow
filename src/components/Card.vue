<template>
    <div class="card" :style="{width,height}">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "card",
    props:{
      width:0,
      height:0
    }
  }
</script>

<style scoped>
.card{
    position: relative;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0

    rgba(0,0,0,.1);
    overflow: hidden;
    height: 52px;
    background: white;
}
</style>