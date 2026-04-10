export const config = {
  type: 'bar',
  title: '整体健康度',
  category: ['支付系统', '自动售票系统', '联合站系统', '人事', '采购'],
  data: [
    {
      data: [80, 76, 68, 90, null],
      name: '最大值',
    },
    {
      data: [75, 80, 65, null, 76],
      name: '最小值',
    },
  ],
  unit: [null, '%'],
  yRange: [null, 100],
}

export const config2 = {
  type: 'bar',
  title: '尚未开始国产替换进程的业务',
  category: ['统一门户', '电商系统', '公文系统', '考勤系统', '项目管理系统'],
  data: [
    {
      type: 'bar',
      name: '2024/10',
      data: [20, 20, 40, 50, 60],
    },
  ],
  unit: [null, '%'],
  yRange: [null, 100],
  reverse: true,
}

console.log('条形图：', config2)

export default `# 柱状图
\`\`\`echarts
${JSON.stringify(config)}
\`\`\`

# 条形图
\`\`\`echarts
${JSON.stringify(config2)}
\`\`\`
`
