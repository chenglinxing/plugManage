<template>
  <!--插件类型-->
  <div class="plug-type">
    <plug-type-header />
  </div>
</template>

<script>
export default {
  components: {
    plugTypeHeader: () => import("./components/plugTypeHeader"),
  },
};
</script>

<style>
</style>