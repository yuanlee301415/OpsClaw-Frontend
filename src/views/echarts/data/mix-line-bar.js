export const config = {
  type: 'mix-line-bar',
  title: '健康度变化',
  category: ['8/1', '8/2', '8/3', '8/4', '8/5', '8/6', '8/7'],
  bar: {
    name: '日告警数',
    unit: '次',
    min: 0,
    max: 1000,
    data: [
      {
        name: '主机日告警数',
        data: [26, 59, 90, 264, 287, 707, 487],
      },
      {
        name: '网络日告警数',
        data: [126, 159, 190, 641, 871, 7, 874],
      },
    ],
  },
  line: {
    name: '健康度日均值',
    unit: '%',
    min: 0,
    max: 100,
    data: [
      {
        name: '主机健康度日均值',
        data: [20, 45, 13, 34, 65, 42, 105],
      },
      {
        name: '网络健康度日均值',
        data: [12, 23, 34, 45, 56, 78, 120],
      },
    ],
  },
}

export default `# 折柱混合
\`\`\`echarts
${JSON.stringify(config)}
\`\`\`
`
