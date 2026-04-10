/**
 * 折线 - 堆叠面积图
 * @param {json} config 配置
 * @param {string} config.title 标题
 * @param {string[]} config.category X轴数据
 * @param {{name: string, data: number}[]} config.data Y轴数据
 * @param {boolean} [config.smooth=true] 是否平滑曲线（可选，默认平滑）
 * @param {boolean} [config.tooltip=true] 是否显示 Tooltip（可选，默认显示）
 * @param {[string, string]} [config.unit=['','']] unit X轴单位，Y轴单位（可选，默认为空）
 */
export default function areaStack(config) {
  const { title, category, data, smooth = true, tooltip = true, unit = ['', ''] } = { ...config }
  return {
    title: {
      text: title,
      left: 'center',
      top: 5,
    },
    legend: {
      top: 40,
    },
    grid: {
      top: 80,
      left: 10,
      right: 20,
      bottom: 10,
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: category,
        axisLabel: {
          formatter: '{value}' + (unit[0] || ''),
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value}' + (unit[1] || ''),
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      show: Boolean(tooltip),
      valueFormatter: (value) => `${value}${unit[1] || ''}`,
    },
    series:
      data &&
      data.map((_) => ({
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        smooth: Boolean(smooth),
        name: _.name,
        data: _.data,
      })),
  }
}
