/*
 * 表格分页交互功能
 * */

import { MD_CLASS_NAME, MD_PAGINATION_CLASS_NAME, PAGER_BUTTON_MAX } from '../constants'

/**
 * 表格分页交互功能
 * @param {HTMLElement} mdRef - 表格分页组件 DOM
 */
export default function tablePagination(mdRef) {
  if (!mdRef) return

  mdRef.querySelectorAll(`.${MD_CLASS_NAME.TABLE_CONTAINER}`).forEach(($el) => {
    const $pagination = $el.querySelector(`.${MD_PAGINATION_CLASS_NAME.CONTAINER}`)
    if (!$pagination) return

    const $prev = $pagination.querySelector(`.${MD_PAGINATION_CLASS_NAME.PREV_BUTTON}`)
    const $prevMore = $pagination.querySelector(`.${MD_PAGINATION_CLASS_NAME.LEFT_COLLAPSED_POINTER}`)
    const $next = $pagination.querySelector(`.${MD_PAGINATION_CLASS_NAME.NEXT_BUTTON}`)
    const $nextMore = $pagination.querySelector(`.${MD_PAGINATION_CLASS_NAME.RIGHT_COLLAPSED_POINTER}`)
    const $pageButtons = $pagination.querySelectorAll(`.${MD_PAGINATION_CLASS_NAME.BUTTON_CONTAINER} a`)
    const $bodies = $el.querySelectorAll('tbody')

    $pageButtons.forEach(($button) => {
      $button.addEventListener('click', (e) => {
        page(e.target)
      })
    })

    $prev.addEventListener('click', (e) => {
      page(e.target)
    })

    $next.addEventListener('click', (e) => {
      page(e.target)
    })

    /**
     * 翻页
     * @param {HTMLButtonElement} $button 翻页按钮
     */
    function page($button) {
      const pageNumber = Number($button.dataset.page)

      $bodies.forEach(($tbody, idx) => {
        setDisplayClassName($tbody, idx + 1 === pageNumber)
      })

      $pageButtons.forEach(($btn, idx) => {
        $btn.classList.toggle(MD_PAGINATION_CLASS_NAME.ACTIVE_BUTTON, idx + 1 === pageNumber)
      })

      $prev.dataset.page = String(pageNumber - 1)
      $prev.disabled = pageNumber === 1
      $next.dataset.page = String(pageNumber + 1)
      $next.disabled = pageNumber === $pageButtons.length

      displayPageButton(pageNumber, $pageButtons.length)
    }

    /**
     * 显示页码按钮
     * @param {number} pageNumber 当前页码
     * @param {number} total 总页码
     */
    function displayPageButton(pageNumber, total) {
      if (total <= PAGER_BUTTON_MAX) return

      const halfPagerValue = Math.ceil((PAGER_BUTTON_MAX - 1) / 2)

      setDisplayClassName($prevMore, pageNumber - halfPagerValue > 1)

      setDisplayClassName($nextMore, pageNumber + halfPagerValue < total)

      $pageButtons.forEach(($btn, idx) => {
        if (idx === 0 || idx + 1 === total) return

        let left = pageNumber - halfPagerValue
        let right = pageNumber + halfPagerValue
        if (left < 1) {
          right += 1 - left
        }
        if (right > total) {
          left -= right - total
        }
        setDisplayClassName($btn, idx + 1 > left && idx + 1 < right)
      })
    }
  })
}

/**
 * 设置元素显示隐藏类名
 * @param {HTMLElement} element
 * @param {boolean} display 是否显示
 * @param {string} [invisibleClassName='invisible'] 隐藏元素的 className
 */
function setDisplayClassName(element, display, invisibleClassName = MD_CLASS_NAME.INVISIBLE) {
  if (display) {
    element.classList.remove(invisibleClassName)
  } else {
    element.classList.add(invisibleClassName)
  }
}
