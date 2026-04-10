export const config = {
  type: 'historical-curve',
  title: '端口流量',
  unit: 'Mb',
  data: [
    {
      name: '端口 80',
      data: [
        [1720420170614, 379],
        [1720420171614, 475],
        [1720420172614, 496],
      ],
    },
    {
      name: '端口 443',
      data: [
        [1720420170614, 281],
        [1720420171614, 225],
        [1720420172614, 334],
      ],
    },
    {
      name: '端口 8080',
      data: [
        [1720420170614, 127],
        [1720420171614, 220],
        [1720420172614, 224],
      ],
    },
  ],
  yRange: [null, 1000],
}

console.log('historical-curve>demo>config:', config)

export default `# 折线图-历史记录曲线图
\`\`\`echarts\n
${JSON.stringify(config, null, 2)}
\n\`\`\`
`
