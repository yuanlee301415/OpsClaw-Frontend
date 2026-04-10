/**
 * 饼图 - 圆角环形
 * @param {json} config 配置
 * @param {string} config.title 标题
 * @param {{name: string, value: number}[]} config.data 数据
 * @param {string} [config.name] 系列名称，用于 Tooltip / Legend 的显示名称
 * @param {boolean} [config.tooltip=true] 是否显示 Tooltip（可选，默认显示）
 * @param {string} [config.unit=''] 单位（可选，默认为''）
 * @param {boolean} [config.half=false] 是否半圆（可选，默认非半圆）
 */
export default function pieBorderRadius(config) {
  const { title, data = [], name = '', tooltip = true, unit = '', half = false } = { ...config }
  const total = data.reduce((acc, curr) => acc + curr.value, 0)
  const startAngle = half ? 180 : 90
  const endAngle = half ? 360 : 'auto'

  return {
    title: {
      text: title,
      left: 'center',
      top: 5,
    },
    tooltip: {
      show: Boolean(tooltip),
      trigger: 'item',
      textStyle: {
        align: 'left',
      },
      formatter(params) {
        return [
          `<div style="font-size: 14px;color: #666;">${params.seriesName}</div>`,
          `<div style="display: flex;justify-content: space-between;line-height:1;margin-top: 10px;"><span>${params.marker} ${
            params.name
          }</span><b style="margin-left: 20px;">${params.value}${unit}(${params.percent.toFixed()}%)</b></div>`,
        ].join('')
      },
    },
    legend: {
      show: true,
      top: 40,
      left: 'center',
      formatter(name) {
        const item = data.find((_) => _.name === name)
        const percent = (item.value / total) * 100
        return `${item.name} - ${item.value}${unit}(${percent.toFixed()}%)`
      },
    },
    series: [
      {
        name,
        type: 'pie',
        left: 'left',
        center: ['center', 240],
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        startAngle,
        endAngle,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          position: 'inner',
          fontSize: 14,
          formatter: '{c}',
        },
        data:
          data &&
          data.map((_) => ({
            value: Number(_.value),
            name: _.name,
          })),
      },
    ],
  }
}
