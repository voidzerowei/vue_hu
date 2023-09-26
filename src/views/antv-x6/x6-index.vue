<template>
  <!-- 注意，使用 autoResize 配置时，需要在画布容器外面再套一层宽高都是 100% 的外层容器，在外层容器上监听尺寸改变，当外层容器大小改变时，画布自动重新计算宽高以及元素位置。 -->
  <div class="backgournd-grid-app">
    <div id="container" class="app-content"></div>
  </div>
</template>

<script setup>
import { Graph } from "@antv/x6";
import { reactive, onMounted } from "vue";

const graph = reactive({});

onMounted(() => {
  graph.value = new Graph({
    container: document.getElementById("container"),
    background: {
      color: "#F2F7FA",
    },
    grid: {
      visible: true,
      type: "doubleMesh",
      args: [
        {
          color: "#eee", // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: "#ddd", // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
  });
});
</script>

<style scoped>
.backgournd-grid-app {
  display: flex;
  width: 100%;
  padding: 0;
  font-family: sans-serif;
}
.app-content {
  flex: 1;
  height: 80vh;
  margin-right: 8px;
  margin-left: 8px;
  border-radius: 5px;
  box-shadow: 0 12px 5px -10px rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%);
}
</style>
