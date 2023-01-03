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
    ...pages,
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
