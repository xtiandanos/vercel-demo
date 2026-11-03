export default function About() {
  return (
    <main>
      <h1>About</h1>
      <p>
        This page exists to demo the classic single-page-app hosting gotcha.
        Vite builds exactly one HTML file (<code>dist/index.html</code>), so when
        you refresh this page, the server looks for{' '}
        <code>/about/index.html</code> — which doesn't exist. Without a rule,
        you'd get a <strong>404</strong>.
      </p>
      <p>
        The fix is <code>vercel.json</code> in the repo root: it rewrites every
        path that doesn't match a real file back to <code>/index.html</code>, so
        React Router takes over.
      </p>
      <p>
        <strong>Try it:</strong> refresh this page right now — it survives,
        because the rewrite is already deployed with the app.
      </p>
    </main>
  )
}
