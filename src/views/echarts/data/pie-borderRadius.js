export const config = {
  type: 'pie-borderRadius',
  title: '总资源分布(300)',
  name: '监控资源总数',
  data: [
    {
      value: 1048,
      name: '网络设备',
    },
    {
      value: 735,
      name: '主机',
    },
    {
      value: 580,
      name: '数据库',
    },
    {
      value: 484,
      name: '中间件',
    },
    {
      value: 300,
      name: '其它',
    },
  ],
  unit: '台',
}

export const config2 = {
  type: 'pie-borderRadius',
  title: '数据库',
  data: [
    {
      value: 2,
      name: 'Oracle',
    },
    {
      value: 1,
      name: '达梦',
    },
  ],
  half: true,
}

console.log('半圆角环形:', config2)

export default `# 饼图-圆角环形
\`\`\`echarts
${JSON.stringify(config)}
\`\`\`

# 饼图-半圆角环形
\`\`\`echarts
${JSON.stringify(config2)}
\`\`\`
`
