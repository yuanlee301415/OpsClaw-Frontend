/**
 * 折柱混合图
 * @param {json} config 配置
 * @param {string} config.title 标题
 * @param {string[]} config.category X轴数据
 * @param {boolean} [config.tooltip=true] 是否显示 Tooltip（可选，默认显示）
 *
 * @param {json} config.bar 柱状配置
 * @param {string} config.bar.name 柱状刻度轴名称
 * @param {number} [config.bar.min] 柱状刻度轴最小值（可选，默认无配置）
 * @param {number} [config.bar.max] 柱状刻度轴最大值（可选，默认无配置）
 * @param {string} [config.bar.unit] 柱状单位（可选，默认为空）
 * @param {{name: string, data: number[]}[]} config.bar.data 柱状数据
 *
 * @param {json} config.line 折线配置
 * @param {string} config.line.name 折线刻度轴名称
 * @param {number} [config.line.min] 折线刻度轴最小值（可选，默认无配置）
 * @param {number} [config.line.max] 折线刻度轴最大值（可选，默认无配置）
 * @param {string} [config.line.unit] 折线单位（可选，默认为空）
 * @param {{name: string, data: number[]}[]} config.line.data 折线数据
 */
export default function mixLineBar(config) {
  const { title, category, tooltip = true, bar = {}, line = {} } = { ...config }
  return {
    title: {
      text: title,
      left: 'center',
      top: 5,
    },
    grid: {
      top: 100,
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
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
      textStyle: {
        align: 'left',
      },
      formatter(params) {
        return [
          `<div style="font-size: 14px;color: #666;">${params[0].name}</div>`,
          ...params
            .filter((item) => item.value !== null && item.value !== void 0)
            .map(
              (item) =>
                `<div style="display: flex;justify-content: space-between;line-height:1;margin-top: 10px;"><span>${item.marker} ${
                  item.seriesName
                }</span><b style="margin-left: 20px;">${item.value}${(config[item.seriesType] && config[item.seriesType].unit) || ''}</b></div>`,
            ),
        ].join('')
      },
    },
    xAxis: {
      type: 'category',
      data: category,
      axisPointer: {
        type: 'shadow',
      },
    },
    yAxis: [
      {
        type: 'value',
        name: bar.name,
        min: bar.min,
        max: bar.max,
        axisLabel: {
          formatter: `{value}${bar.unit || ''}`,
        },
      },
      {
        type: 'value',
        name: line.name,
        min: line.min,
        max: line.max,
        axisLabel: {
          formatter: `{value}${line.unit || ''}`,
        },
      },
    ],
    series: [
      ...(bar.data || []).map((_) => ({
        name: _.name,
        data: _.data,
        type: 'bar',
      })),
      ...(line.data || []).map((_) => ({
        name: _.name,
        data: _.data,
        type: 'line',
        yAxisIndex: 1,
      })),
    ],
  }
}
