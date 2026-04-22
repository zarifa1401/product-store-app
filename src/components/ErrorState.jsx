export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again in a moment.',
  action = null,
}) {
  return (
    <div className="glass-panel px-6 py-10 text-center">
      <p className="eyebrow">Request Error</p>
      <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl">{message}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  )
}
