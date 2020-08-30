<template>
  <div>
    <van-nav-bar title="东南大学校史校情知识竞赛" @click-right="onClickRight">
      <template #left>
        <van-icon name="arrow-left" size="18" color="black" />
      </template>
      <template #right>
        <div style="font-size: 18px">
          <i class="el-icon-s-fold"></i>
        </div>
      </template>
    </van-nav-bar>

    <van-popup
      v-model="showPopup"
      position="right"
      :style="{ height: '100%', width: '70%' }"
    >
      <van-cell-group title="答题信息">
        <van-grid :column-num="3">
          <van-grid-item
            v-for="value in 30"
            :key="value"
            icon="photo-o"
            :text="value.toString()"
          />
        </van-grid>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false
    };
  },
  methods: {
    onClickRight() {
      this.showPopup = !this.showPopup;
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    }
  }
};
</script>

<style></style>
