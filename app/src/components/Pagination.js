export default function Pagination({ total, limit }) {
  return (
    <>
    { total > limit && (
      <div data-testid='pagination'>
      </div>
    )}
    </>
  )
}
