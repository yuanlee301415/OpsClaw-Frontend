/**
 * 柱状图-堆叠
 * @param {json} config 配置
 * @param {string} config.title 标题
 * @param {string[]} config.category X轴数据
 * @param {{name: string, data: number[]}[]} config.data Y轴数据
 * @param {boolean} [config.tooltip=true] 是否显示 Tooltip（可选，默认显示）
 * @param {[string, string]} [config.unit=['','']] unit X轴单位，Y轴单位（可选，默认为空）
 * @param {[number, number]} [config.yRange=[]] Y轴刻度最小值最大值（可选，默认无配置）
 */
export default function barStack(config) {
  const { title, category, data, tooltip = true, unit = ['', ''], yRange = [] } = { ...config }
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
      formatter(params) {
        return [
          `<div style="font-size: 14px;color: #666;">${params[0].name}${unit[0] || ''}</div>`,
          ...params.map(
            (item) =>
              `<div style="display: flex;justify-content: space-between;line-height:1;margin-top: 10px;"><span>${item.marker} ${
                item.seriesName
              }</span><b style="margin-left: 20px;">${item.value}${unit[1] || ''}</b></div>`,
          ),
        ].join('')
      },
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
      min: yRange && yRange[0],
      max: yRange && yRange[1],
    },
    series:
      data &&
      data.map((_) => ({
        name: _.name,
        data: _.data.map(Number),
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
      })),
  }
}
