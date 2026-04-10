/**
 * 仪表盘-等级
 * @param {json} config 配置
 * @param {string} config.title 标题
 * @param {string[]} [config.grades=['A', 'B', 'C', 'D']] 等级显示名称（从高到低，只支持4个等级）
 * @param {{value: number, name: string}} config.data 数据(value: 0-1之间)
 * @param {string} [config.unit=''] 单位（可选，默认为空）
 */
export default function gaugeGrade(config) {
  const { title, grades = ['A', 'B', 'C', 'D'], data = {}, unit = '' } = { ...config }
  return {
    title: {
      text: title,
      left: 'center',
      top: 10,
    },
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '85%'],
        radius: '100%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2'],
            ],
          },
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5,
          },
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          rotate: 'tangential',
          formatter: function (value) {
            if (value === 0.125) {
              return grades[3]
            } else if (value === 0.375) {
              return grades[2]
            } else if (value === 0.625) {
              return grades[1]
            } else if (value === 0.875) {
              return grades[0]
            }
            return ''
          },
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20,
        },
        detail: {
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + unit
          },
          color: 'inherit',
        },
        data: [
          {
            value: data.value,
            name: data.name,
          },
        ],
      },
    ],
  }
}
