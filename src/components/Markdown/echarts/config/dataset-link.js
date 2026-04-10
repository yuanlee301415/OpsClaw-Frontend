/**
 * 联动和共享数据集
 * @param {json} config 配置
 * @param {string[]} config.dimensions 维度
 * @param {[string, ...number[]][]} config.source 数据源
 * @param {[string, string]} [config.unit=['','']] unit X轴单位，Y轴单位（可选，默认为空）
 * @param {[number, number]} [config.yRange=[]] Y轴刻度最小值最大值（可选，默认无配置）
 */
export default function datasetLink(config) {
  const { dimensions = [], source = [], yRange = [], unit = ['', ''] } = { ...config }

  return {
    grid: {
      top: '50%',
      left: 10,
      right: 20,
      bottom: 10,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      showContent: false,
    },
    dataset: {
      source: [dimensions, ...source],
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        formatter: '{value}' + (unit[0] || ''),
      },
    },
    yAxis: {
      gridIndex: 0,
      min: yRange && yRange[0],
      max: yRange && yRange[1],
      axisLabel: {
        formatter: '{value}' + (unit[1] || ''),
      },
    },
    series: [
      ...Array.from({ length: source.length }).map(() => ({
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: {
          focus: 'series',
        },
      })),
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          formatter: `{b}: {@${dimensions[1]}} ({d}%)`,
        },
        encode: {
          itemName: dimensions[0],
          value: dimensions[1],
          tooltip: dimensions[1],
        },
      },
    ],
    events: [
      (chart) => {
        chart.on('updateAxisPointer', function (event) {
          const xAxisInfo = event.axesInfo[0]
          if (!xAxisInfo) return
          const dimension = xAxisInfo.value + 1
          chart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)',
              },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          })
        })
      },
    ],
  }
}
