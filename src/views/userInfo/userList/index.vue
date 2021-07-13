<template>
  <!--用户列表-->
  <div class="user-list">
    <user-info-list />
  </div>
</template>

<script>
export default {
  components: {
    userInfoList: () => import("./components/userInfoList.vue"),
  },
};
</script>


<style>
</style>