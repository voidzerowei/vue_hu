<template>
  <!-- 注意，使用 autoResize 配置时，需要在画布容器外面再套一层宽高都是 100% 的外层容器，在外层容器上监听尺寸改变，当外层容器大小改变时，画布自动重新计算宽高以及元素位置。 -->
  <div class="backgournd-grid-app">
    <div id="container" class="app-content"></div>
    <TeleportContainer />
  </div>
</template>

<script setup>
import { Graph, Path } from "@antv/x6";
import { reactive, onMounted } from "vue";
import { register, getTeleport } from "@antv/x6-vue-shape";
import ProgressNode from "./components/progress-node.vue";

register({
  shape: "node_hu",
  width: 200,
  height: 70,
  component: ProgressNode,
  ports: {
    groups: {
      top: {
        position: "top",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#C2C8D5",
            strokeWidth: 1,
            fill: "#fff",
          },
        },
      },
      bottom: {
        position: "bottom",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#C2C8D5",
            strokeWidth: 1,
            fill: "#fff",
          },
        },
      },
    },
  },
});

Graph.registerEdge(
  "dag-edge",
  {
    inherit: "edge",
    attrs: {
      line: {
        stroke: "#C2C8D5",
        strokeWidth: 1,
        targetMarker: "classic",
      },
    },
  },
  true
);

Graph.registerConnector(
  "algo-connector",
  (s, e) => {
    const offset = 4;
    const deltaY = Math.abs(e.y - s.y);
    const control = Math.floor((deltaY / 3) * 2);

    const v1 = { x: s.x, y: s.y + offset + control };
    const v2 = { x: e.x, y: e.y - offset - control };

    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `
    );
  },
  true
);

const TeleportContainer = getTeleport();

const graph = reactive({});

const initGraph = () => {
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
};
const initNode = () => {
  // graph.value.addNode({
  //   shape: "node_hu",
  //   x: 100,
  //   y: 60,
  //   data: {
  //     status: "success",
  //     label: "No.1",
  //   },
  // });

  // graph.value.addNode({
  //   shape: "node_hu",
  //   x: 100,
  //   y: 180,
  //   data: {
  //     status: "running",
  //     label: "No.2",
  //   },
  // });

  // graph.value.addNode({
  //   shape: "node_hu",
  //   x: 100,
  //   y: 300,
  //   data: {
  //     status: "failed",
  //     label: "No.3",
  //   },
  // });
  const cells = [];
  const dataNode = [];
  const dataEdge = [];

  for (let i = 0; i < 3; i++) {
    dataNode.push({
      id: `node_${i}`,
      shape: "node_hu",
      x: 100,
      y: 120 * i,
      ports: [
        {
          id: `port-1`,
          group: "top",
        },
        {
          id: `port-2`,
          group: "bottom",
        },
      ],
      data: {
        status: "failed",
        label: `No.${i}`,
      },
    });
  }

  console.log(dataNode);

  for (let i = 0; i < dataNode.length; i++) {
    if (i !== dataNode.length - 1) {
      dataEdge.push({
        shape: "dag-edge",
        source: {
          cell: `node_${i}`,
          port: "port-2",
        },
        target: {
          cell: `node_${i + 1}`,
          port: "port-1",
        },
        zIndex: 0,
      });
    }
  }

  dataNode.forEach((item) => {
    cells.push(graph.value.createNode(item));
  });

  dataEdge.forEach((item) => {
    cells.push(graph.value.createEdge(item));
  });

  graph.value.resetCells(cells);
  graph.value.centerContent();
};

onMounted(() => {
  initGraph();

  initNode();
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
