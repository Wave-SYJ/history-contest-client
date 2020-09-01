<template>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    if (this.$store.state.user.id == -1) this.$store.dispatch("user/getInfo");
  }
};
</script>

<style></style>
