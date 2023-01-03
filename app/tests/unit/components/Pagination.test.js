import { render, screen, waitFor } from '@testing-library/react'

import Pagination from '@/components/Pagination'

it.each([
    ['', 2, '>', 1, 1],
    ['', 20, '>', 10, 1],
    [' not', 1, '==', 1, 0],
    [' not', 0, '==', 1, 0],
  ])("should%s render pagination when total (%s) %s (%s) limit", async (
    doit, total, how, limit, length
  ) => {
  render(<Pagination total={total} limit={limit} />)

  await waitFor(() =>
    expect(screen.queryAllByTestId('pagination')).toHaveLength(length)
  )
})

it.each([
    [4, 'P 1 2 N', 2, 1],
  ])("should render %s page buttons as '%s' when total = %s and limit = %s",
  async (items, content, total, limit) => {
  render(<Pagination total={total} limit={limit} />)

  await waitFor(() =>
    expect(screen.queryAllByTestId('page-item')).toHaveLength(items)
  )
  await waitFor(() =>
    expect(screen.getByTestId('pagination').textContent)
      .toBe(content.split(' ').join(''))
  )
})

it.todo("should render '%s' label to '%s' button when it has customized")
it.todo("should render '%s' disabled when page count is '%s' and current = '%s'")
it.todo("should not be possible to click a disabled button")
it.todo("should trigger go to page when page button is clicked")
it.todo("should go to page '%s' when '%s' page button is clicked")
