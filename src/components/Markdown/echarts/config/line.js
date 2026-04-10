/**
 * 折线图
 * @param {json} config 配置
 * @param {string} config.title 标题
 * @param {string[]} config.category X轴数据
 * @param {number[]} config.data Y轴数据
 * @param {boolean} [config.smooth=true] 是否平滑曲线（可选，默认平滑）
 * @param {boolean} [config.tooltip=true] 是否显示 Tooltip（可选，默认显示）
 * @param {[string, string]} [config.unit=['','']] unit X轴单位，Y轴单位（可选，默认为空）
 */
export default function line(config) {
  const { title, category, data, smooth = true, tooltip = true, unit = ['', ''] } = { ...config }
  return {
    title: {
      text: title,
      left: 'center',
      top: 5,
    },
    grid: {
      top: 80,
      left: 10,
      right: 20,
      bottom: 10,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: category,
      axisLabel: {
        formatter: '{value}' + (unit[0] || ''),
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}' + (unit[1] || ''),
      },
    },
    tooltip: {
      show: Boolean(tooltip),
      trigger: 'axis',
      valueFormatter: (value) => `${value}${unit[1] || ''}`,
    },
    series: [
      {
        type: 'line',
        smooth: Boolean(smooth),
        data: data && data.map(Number),
      },
    ],
  }
}
