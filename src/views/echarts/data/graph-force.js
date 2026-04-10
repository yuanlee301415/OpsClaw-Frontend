export const config = {
  type: 'graph-force',
  title: '拓扑图-链路图',
  nodes: [
    {
      id: '1',
      name: '120.1.1.1',
    },
    {
      id: '2',
      name: '120.1.1.2',
    },
    {
      id: '3',
      name: '120.1.1.3',
    },
    {
      id: '4',
      name: '120.1.1.4',
    },
    {
      id: '5',
      name: '120.1.1.5',
    },
    {
      id: '6',
      name: '120.1.1.6',
    },
  ],
  edges: [
    {
      label: '120.1.1.5[GE/4(GE/4 Interface)]--120.1.1.9[GE 0/0]',
      source: '1',
      target: '2',
    },
    {
      label: '120.1.1.5[GE/4(GE/4 Interface)]--120.1.1.9[GE 0/0]',
      source: '1',
      target: '3',
    },
    {
      label: '120.1.1.5[GE/4(GE/4 Interface)]--120.1.1.9[GE 0/0]',
      source: '2',
      target: '3',
    },
    {
      label: '120.1.1.5[GE/4(GE/4 Interface)]--120.1.1.9[GE 0/0]',
      source: '2',
      target: '4',
    },
    {
      label: '120.1.1.5[GE/4(GE/4 Interface)]--120.1.1.9[GE 0/0]',
      source: '3',
      target: '2',
    },
    {
      label: '120.1.1.5[GE/4(GE/4 Interface)]--120.1.1.9[GE 0/0]',
      source: '4',
      target: '3',
    },
    {
      label: '120.1.1.5[GE/4(GE/4 Interface)]--120.1.1.9[GE 0/0]',
      source: '4',
      target: '5',
    },
    {
      label: '120.1.1.5[GE/4(GE/4 Interface)]--120.1.1.9[GE 0/0]',
      source: '6',
      target: '5',
    },
  ],
}

console.log('graph-force>demo>config:', config)

export default `# 拓扑图-链路图
\`\`\`echarts\n
${JSON.stringify(config, null, 2)}
\n\`\`\`
`
