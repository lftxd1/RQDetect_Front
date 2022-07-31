<template>
  <div class="github-link-wrapper">
    <el-tooltip effect="dark" content="https://gitee.com/lftxd1/IntrusionSystem" placement="bottom">
      <a href="https://gitee.com/lftxd1/IntrusionSystem" target="_blank" rel="noopener">
        <i class="icon vue-dsn-icon-git" />
      </a>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'GitHubLink'
}
</script>

<style lang="less">
.github-link-wrapper {
  float: left;
  width: 22px;
  height: 22px;
  padding: 4px;
  cursor: pointer;
  .icon {
    font-size: 24px;
  }
  &:hover {
    color: #409eff;
  }
}
</style>
