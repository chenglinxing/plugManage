<template>
  <div class="plug-index">
    <div>
      <!-- {{ flag }}
      <el-button @click="flag = !flag">点击</el-button> -->
    </div>
    <plug-header :flag.sync="flag" />
  </div>
</template>

<script>
export default {
  components: {
    plugHeader: () => import("./components/plugHeader"),
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      flag: true,
    };
  },
};
</script>

<style>
</style>