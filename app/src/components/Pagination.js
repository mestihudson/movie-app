export default function Pagination({
    total, limit, current = 1, prevLabel = 'P', nextLabel = 'N',
    goToPage = function() {}
  }) {
  const pages = new Array(Math.ceil(total / limit))
    .fill(0)
    .map((e, i) => {
      const position = i + 1
      const key = position
      const label = key
      const disabled = current === position
      return { key, label, disabled }
    })
  const items = [
      { key: 'prev', label: prevLabel, disabled: current === 1 },
      ...pages
        .reduce((acc, cur, ind, src) => {
          const position = ind + 1
          const { length: srcLen } = src
          const { length: pagesLen } = pages
          const isGap = srcLen > 4 && position !== 1 && position !== pagesLen &&
            Math.abs(current - position) > 1
          const isBefore = isGap && current - position > 0
          const isAfter = isGap && current - position < 0
          return [ ...acc, { ...cur, isBefore, isAfter, isGap } ]
        }, [])
        .reduce((acc, cur, ind, src) => {
          const { length: srcLen } = src
          const { length: pagesLen } = pages
          const { key, label, disabled } = cur
          const result = cur.isBefore && !acc.some((e) => e.key === 'before')
            ? [
              ...acc,
              { key: 'before', label: '...' }
            ]
            : (
              cur.isAfter && !acc.some((e) => e.key === 'after')
                ? [
                  ...acc,
                  { key: 'after', label: '...' }
                ]
                : (cur.isGap ? [ ...acc ] : [ ...acc, { key, label, disabled } ])
            )
          return result
        }, [])
      ,
      { key: 'next', label: nextLabel, disabled: current === pages.length },
    ]
  function pageItemButtonOnClick(key) {
    let target = key
    if (key === 'prev') {
      target = current - 1
    }
    if (key === 'next') {
      target = current + 1
    }
    goToPage(target)
  }
  return (
    <>
    { total > limit && (
      <div data-testid='pagination'>
        { items.map(({ key, label, disabled }) =>
          <li key={key} data-testid='page-item'>
            <button disabled={disabled} onClick={() => pageItemButtonOnClick(key)}
            >{label}</button>
          </li>
        )}
      </div>
    )}
    </>
  )
}
