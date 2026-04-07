/*
 * Markdown 组件常量
 */

// Markdown 类名
export const MD_CLASS_NAME = {
  // 表格容器（包含：表格、翻页相关按钮）
  TABLE_CONTAINER: 'table-container',

  // 隐藏元素(Use style: `display: none`)
  INVISIBLE: 'invisible',
}

//  ECharts 图表 类名
export const MD_ECHARTS_CLASS_NAME = {
  // 图表容器（包含：ECharts 配置代码、ECharts 图表占位元素）
  CONTAINER: 'echarts-container',

  // 图表占位
  PLACEMENT: 'echarts-placement',

  // 图表配置
  CONFIG: 'echarts-config',
}

// 表格分页 类名
export const MD_PAGINATION_CLASS_NAME = {
  // 分页容器（包含：上/下一页、左/右边折叠提示、页码按钮）
  CONTAINER: 'pagination-container',

  // “上一页”按钮
  PREV_BUTTON: 'pagination-prev-button',

  // “下一页”按钮
  NEXT_BUTTON: 'pagination-next-button',

  // 页码按钮容器（只包含：页码按钮）
  BUTTON_CONTAINER: 'pagination-button-container',

  // 当前页码按钮高亮
  ACTIVE_BUTTON: 'active',

  // 左边折叠页码按钮提示
  LEFT_COLLAPSED_POINTER: 'pagination-left_collapsed-pointer',

  // 右边折叠页码按钮提示
  RIGHT_COLLAPSED_POINTER: 'pagination-right_collapsed-pointer',
}

// 代码块高亮 类名
export const MD_CODE_BLOCK_CLASS_NAME = {
  // 代码块容器
  CONTAINER: 'code-block-container',

  // 工具栏容器
  TOOL_CONTAINER: 'code-tool-container',

  // 代码行
  LINE: 'code-line',

  // “复制”按钮
  COPY_BUTTON: 'copy-button',
}

// 表格分页，每页显示的行数
export const PAGE_SIZE = 10

// 表格分页，最大页码按钮数（固定的首页、尾页、中间页码按钮各1个 + 中间页码左右两边各 N 个 * 2）
export const PAGER_BUTTON_MAX = 3 + 2 * 2
