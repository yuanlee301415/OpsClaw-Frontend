/**
 * 折线图-历史记录曲线图
 * @param {json} config 配置
 * @param {string} config.title 标题
 * @param {{name: string, data: [timestamp, number][]}[]} config.data Y轴数据
 * @param {boolean} [config.tooltip=true] 是否显示 Tooltip（可选，默认显示）
 * @param {string} [config.unit=''] unit Y轴单位（可选，默认为空）
 * @param {[number, number]} [config.yRange=[]] Y轴刻度最小值最大值（可选，默认无配置）
 */
export default function historicalCurve(config) {
  const { title, data, tooltip = true, unit = '', yRange = [] } = { ...config }
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
    legend: {
      top: 40,
      left: 'center',
    },
    tooltip: {
      show: Boolean(tooltip),
      trigger: 'axis',
      textStyle: {
        align: 'left',
      },
      valueFormatter: (value) => `${value}${unit || ''}`,
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}',
        hideOverlap: true,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}' + unit,
      },
      min: yRange && yRange[0],
      max: yRange && yRange[1],
    },
    series:
      data &&
      data.map((_) => ({
        name: _.name,
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: _.data && _.data.map((val) => [Number(val[0]), Number(val[1])]),
      })),
  }
}
