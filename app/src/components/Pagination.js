export default function Pagination({ total, limit }) {
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
          const { length: srcLen } = src
          const visible = srcLen > 4 && (ind > 1 && ind < srcLen - 1)
          return visible ? [ ...acc ] : [ ...acc, cur ]
        }, [])
        .reduce((acc, cur, ind, src) => {
          const { length: srcLen } = src
          const { length: pagesLen } = pages
          const visible = pagesLen != srcLen && ind === src.length - 1
          return visible
            ? [ ...acc, { key: 'gap', label: '...' }, cur, ]
            : [ ...acc, cur, ]
        }, []),
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
