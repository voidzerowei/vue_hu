<template>
  <div
    :class="{
      node: true,
      success: status === 'success',
      failed: status === 'failed',
    }"
  >
    <span class="label">{{ label }}</span>
    <img
      class="node_img"
      v-show="status !== 'default'"
      :src="image"
      :class="{
        running: status === 'running',
        success: status === 'success',
        failed: status === 'failed',
      }"
    />
  </div>
</template>

<script setup>
import { reactive, inject, onMounted } from "vue";

const getNode = inject("getNode");

const image = reactive({
  default: "",
  success:
    "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ",
  failed:
    "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ",
  running:
    "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ",
});

onMounted(() => {
  const node = getNode();
  console.log(node);
});
</script>

<style>
.node {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #c2c8d5;
  border-left: 4px solid #5f95ff;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
}
.icon {
  margin-left: 5px;
  height: 10px;
  width: 10px;
}
.node .label {
  display: inline-block;
  flex-shrink: 0;
  width: auto;
  margin-left: 4px;
  color: #666;
  font-size: 14px;
  margin-top: -2px;
}
.node_img {
  width: 20px;
  height: 20px;
  margin-left: auto;
}
.node .status {
  flex-shrink: 0;
}
.node.success {
  border-left: 4px solid #52c41a;
}
.node.failed {
  border-left: 4px solid #ff4d4f;
}
.running {
  animation: spin 1s linear infinite;
}

.x6-node-selected .node {
  border-color: #1890ff;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #d4e8fe;
}
.x6-node-selected .node.success {
  border-color: #52c41a;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #ccecc0;
}
.x6-node-selected .node.failed {
  border-color: #ff4d4f;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #fedcdc;
}
.x6-edge:hover path:nth-child(2) {
  stroke: #1890ff;
  stroke-width: 1px;
}

.x6-edge-selected path:nth-child(2) {
  stroke: #1890ff;
  stroke-width: 1.5px !important;
}

@keyframes running-line {
  to {
    stroke-dashoffset: -1000;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
