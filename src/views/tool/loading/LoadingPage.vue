<template>
  <div>
    <div v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="loadingText" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      loadingText: {
        type: String,
        default: null
      }
    },
    data: function () {
      return {
        fullscreenLoading: false
      }
    },
    watch: {
      loadingText() {
        this.fullscreenLoading = (this.loadingText != null);
      }
    }
  }

</script>
