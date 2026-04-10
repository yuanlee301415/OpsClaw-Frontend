const config = {
  type: 'line',
  title: '折线图-基础',
  category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  data: [150, 230, 224, 218, 135, 147, 260],
  unit: ['', '元'],
}

console.log('line-basic:', config)

export default `# 折线图-基础
\`\`\`echarts
${JSON.stringify(config)}
\`\`\`
`
