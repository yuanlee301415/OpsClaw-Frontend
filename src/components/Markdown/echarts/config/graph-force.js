/**
 * 拓扑图-链路图
 * @param {json} config 配置
 * @param {string} config.title 标题
 * @param {{id: string, name: string}[]} config.nodes 节点
 * @param {{source: string, target: string, label: string}[]} config.edges 边
 */
export default function graphForce(config) {
  const { title, nodes, edges } = { ...config }
  return {
    title: {
      text: title,
      left: 'center',
      top: 5,
    },
    tooltip: {},
    series: [
      {
        data:
          nodes &&
          nodes.map((_) => ({
            id: _.id,
            name: _.name,
            symbolSize: 20,
          })),
        edges:
          edges &&
          edges.map((_) => ({
            source: _.source,
            target: _.target,
            label: {
              show: true,
              formatter: _.label,
            },
          })),
        layout: 'force',
        type: 'graph',
        roam: true,
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        label: {
          show: true,
          position: 'bottom',
          fontSize: 12,
        },
        edgeLabel: {
          show: true,
          fontSize: 10,
          color: '#333',
        },
        lineStyle: {
          color: 'source',
          opacity: 0.8,
        },
        force: {
          repulsion: 1000,
          edgeLength: 300,
          layoutAnimation: false,
          gravity: 0.5,
        },
        emphasis: {
          focus: 'adjacency',
        },
      },
    ],
  }
}
