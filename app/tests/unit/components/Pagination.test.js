import { fireEvent, render, screen, waitFor } from '@testing-library/react'

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
    [5, 'P 1 2 3 N', 3, 1],
    [6, 'P 1 2 3 4 N', 4, 1],
    [6, 'P 1 2 ... 5 N', 5, 1],
    [6, 'P 1 2 ... 10 N', 10, 1],
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

it.each([
    [4, 'P 1 2 N', 2, 1, 2],
    [5, 'P 1 2 3 N', 3, 1, 3],
    [6, 'P 1 2 3 4 N', 4, 1, 3],
    [7, 'P 1 2 3 ... 5 N', 5, 1, 2],
    [7, 'P 1 2 3 4 5 N', 5, 1, 3],
    [7, 'P 1 2 3 ... 10 N', 10, 1, 2],
    [8, 'P 1 2 3 4 ... 10 N', 10, 1, 3],
    [9, 'P 1 ... 3 4 5 ... 10 N', 10, 1, 4],
  ])("should render %s page buttons as '%s' when total = %s and limit = %s and current = %s",
  async (items, content, total, limit, current) => {
  render(<Pagination total={total} limit={limit} current={current}/>)

  await waitFor(() =>
    expect(screen.queryAllByTestId('page-item')).toHaveLength(items)
  )
  await waitFor(() =>
    expect(screen.getByTestId('pagination').textContent)
      .toBe(content.split(' ').join(''))
  )
})

it.each([
    ['Anterior 1 2 N', 'prev', 2, 1, 1, { prevLabel: 'Anterior' }],
    ['P 1 2 Próxima', 'next', 2, 1, 1, { nextLabel: 'Próxima' }],
    ['Anterior 1 2 Próxima', 'prev and next', 2, 1, 1, { nextLabel: 'Próxima', prevLabel: 'Anterior' }],
  ])("should render '%s' label(s) to '%s' button(s) when it has customized",
  async (content, button, total, limit, current, props) => {
  render(<Pagination total={total} limit={limit} current={current} {...props}/>)

  await waitFor(() =>
    expect(screen.getByTestId('pagination').textContent)
      .toBe(content.split(' ').join(''))
  )
})

it.each([
    ['P', true, 9, 1],
    ['P', false, 9, 5],
    ['P', false, 9, 9],
    ['N', true, 9, 9],
    ['N', false, 9, 5],
    ['N', false, 9, 1],
    ['1', true, 9, 1],
    ['1', false, 9, 2],
    ['1', false, 9, 3],
    ['1', false, 9, 9],
    ['2', true, 9, 2],
    ['5', true, 9, 5],
    ['9', false, 9, 1],
    ['9', true, 9, 9],
    ['...', false, 9, 1],
  ])("should render '%s' disabled (%s) when page count is '%s' and current = '%s'",
  async (button, disabled, pages, current) => {
  const total = pages
  const limit = 1
  render(<Pagination total={total} limit={limit} current={current}/>)

  await waitFor(() =>
    expect(screen.getByText(button)).toHaveProperty('disabled', disabled)
  )
})

it("should trigger go to page when page button is clicked", async () => {
  const button = '2'
  const total = 9
  const limit = 1
  const current = 1
  const goToPage = jest.fn()

  render(
    <Pagination
      total={total} limit={limit} current={current} goToPage={goToPage}
    />
  )
  await waitFor(() => {
    fireEvent.click(screen.getByText(button))
  })

  expect(goToPage).toHaveBeenCalled()
})

it("should not be possible to click a disabled button", async () => {
  const button = '2'
  const total = 9
  const limit = 1
  const current = 2
  const goToPage = jest.fn()

  render(
    <Pagination
      total={total} limit={limit} current={current} goToPage={goToPage}
    />
  )
  await waitFor(() => {
    fireEvent.click(screen.getByText(button))
  })

  expect(goToPage).not.toHaveBeenCalled()
})


it.todo("should go to page '%s' when '%s' page button is clicked")
