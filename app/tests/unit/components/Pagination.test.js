import { render, screen, waitFor } from '@testing-library/react'

import Pagination from '../../../src/components/Pagination'

it("should render pagination when total > limit", async () => {
  render(<Pagination total={2} limit={1} />)

  await waitFor(() =>
    expect(screen.queryAllByTestId('pagination')).toHaveLength(1)
  )
})

it.todo("should not render pagination when total <= limit")
it.todo("should render '%s' page buttons group when total = '%' and limit = '%s'")
it.todo("should render '%s' label to '%s' button when it has customized")
it.todo("should render '%s' disabled when page count is '%s' and current = '%s'")
it.todo("should not be possible to click a disabled button")
it.todo("should trigger go to page when page button is clicked")
it.todo("should go to page '%s' when '%s' page button is clicked")
