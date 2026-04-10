const config = {
  type: 'area-stack',
  title: '折线 - 堆叠面积图',
  category: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00'],
  data: [
    {
      name: 'Line1-2025/3/1',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Line2-2025/3/7',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Line3-2025/3/14',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Line4-2025/3/28',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Line5-2025/4/1',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
  unit: ['', 'Mb'],
}

console.log('area-stack:', config)

export default `# 折线 - 堆叠面积图
\`\`\`echarts
${JSON.stringify(config)}
\`\`\`
`
