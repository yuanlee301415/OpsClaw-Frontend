export const config = {
  type: 'pie-basic',
  title: '总资源分布',
  subtitle: '设备总数 1000',
  data: [
    {
      value: 100,
      name: '网络设备',
    },
    {
      value: 200,
      name: '主机',
    },
    {
      value: 300,
      name: '数据库',
    },
    {
      value: 400,
      name: '中间件',
    },
  ],
  unit: '台',
}

console.log('pie-basic>config:', config)

export default `# 饼图-基础
\`\`\`echarts
${JSON.stringify(config)}
\`\`\`

`
