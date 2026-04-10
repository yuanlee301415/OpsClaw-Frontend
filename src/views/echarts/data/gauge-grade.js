export const config = {
  type: 'gauge-grade',
  title: '服务器国产化率',
  grades: ['A', 'B', 'C', 'D'],
  data: {
    value: 0.6,
    name: 'Grade Rating',
  },
  unit: '分',
}

console.log('gauge-grade>demo>config:', config)

export default `# 仪表盘-等级
\`\`\`echarts\n
${JSON.stringify(config, null, 2)}
\n\`\`\`
`
