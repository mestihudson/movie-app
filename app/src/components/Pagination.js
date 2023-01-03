export default function Pagination({ total, limit, current = 1 }) {
  const pages = new Array(Math.ceil(total / limit))
    .fill(0)
    .map((e, i) => {
      const key = i + 1
      const label = key
      return { key, label }
    })
  const items = [
      { key: 'prev', label: 'P' },
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
          const { key, label } = cur
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
                : (cur.isGap ? [ ...acc ] : [ ...acc, { key, label } ])
            )
          return result
        }, [])
      ,
      { key: 'next', label: 'N' },
    ]
  return (
    <>
    { total > limit && (
      <div data-testid='pagination'>
        { items.map(({ key, label }) =>
          <li key={key} data-testid='page-item'>{label}</li>
        )}
      </div>
    )}
    </>
  )
}
