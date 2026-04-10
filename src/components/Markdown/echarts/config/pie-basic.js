/**
 * 饼图 - 基础
 * @param {json} config 配置
 * @param {string} config.title 标题
 * @param {{name: string, value: number}[]} config.data 数据
 * @param {string} [config.subtitle] 副标题（可选）
 * @param {string} [config.name] 系列名称，用于 Tooltip / Legend 的显示名称（可选）
 * @param {boolean} [config.tooltip=true] 是否显示 Tooltip（可选，默认显示）
 * @param {string} [config.unit=''] 单位（可选，默认为''）
 */
export default function pieBasic(config) {
  const { title, subtitle: subtext, data = [], name = '', tooltip = true, unit = '' } = { ...config }

  return {
    title: {
      text: title,
      subtext,
      left: 'center',
      top: 5,
      subtextStyle: {
        fontWeight: 'bold',
        align: 'center',
        verticalAlign: 'center',
        color: '#444',
      },
    },
    tooltip: {
      show: Boolean(tooltip),
      trigger: 'item',
      textStyle: {
        align: 'left',
      },
      formatter(params) {
        return [
          `<div style="font-size: 14px;color: #666;font-weight: 400;">${params.seriesName}</div>`,
          `<div style="display: flex;justify-content: space-between;line-height:1;margin-top: 10px;"><span>${params.marker} ${params.name}</span><b style="margin-left: 20px;">${params.value}${unit}(${params.percent}%)</b></div>`,
        ].join('')
      },
    },
    legend: {
      show: true,
      orient: 'vertical',
      top: 'center',
      right: '10',
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['0%', '50%'],
        label: {
          formatter: `{b}\n{c}${unit}\n{d}%`,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        name,
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
