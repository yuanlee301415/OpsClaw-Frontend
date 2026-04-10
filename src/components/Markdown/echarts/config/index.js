/*
 * ECharts 图表配置
 * */

import areaStack from './area-stack.js'
import bar from './bar.js'
import barStack from './bar-stack.js'
import datasetLink from './dataset-link.js'
import gaugeGrade from './gauge-grade.js'
import graphForce from './graph-force.js'
import historicalCurve from './historical-curve.js'
import line from './line.js'
import mixLineBar from './mix-line-bar.js'
import pieBasic from './pie-basic.js'
import pieBorderRadius from './pie-borderRadius.js'

/**
 * @type {Record<string, Function>}
 * Key 为图表类型
 * Value 为该类型图表的配置生工厂函数
 */
const modules = {
  'area-stack': areaStack,
  bar: bar,
  'bar-stack': barStack,
  'dataset-link': datasetLink,
  'gauge-grade': gaugeGrade,
  'graph-force': graphForce,
  'historical-curve': historicalCurve,
  line: line,
  'mix-line-bar': mixLineBar,
  'pie-basic': pieBasic,
  'pie-borderRadius': pieBorderRadius,
}

export function createEChartsConfig(config = {}) {
  console.log('createEChartsConfig>config:', config.type, config)
  if (!modules[config.type]) {
    throw new Error(`未找到 ${config.type} 类型的图表配置`)
  }
  return modules[config.type](config)
}
