export const config = {
  type: 'bar-stack',
  title: '柱状图-堆叠',
  category: ['8/1', '8/2', '8/3', '8/4', '8/5', '8/6', '8/7'],
  data: [
    {
      name: 'CPU',
      data: [120, 200, 150, 80, 70, 110, 130],
    },
    {
      name: 'MEM',
      data: [60, 1, 64, null, null, 60, null],
    },
    {
      name: 'Disk',
      data: [30, 80, null, 20, 10, null, null],
    },
  ],
  unit: ['', '次'],
  yRange: [null, 320],
}

console.log('bar-stack>demo>config:', config)

export default `# 柱状图-堆叠
\`\`\`echarts\n
${JSON.stringify(config, null, 2)}
\n\`\`\`
`
