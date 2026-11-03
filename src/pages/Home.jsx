const appName = import.meta.env.VITE_APP_NAME ?? '(VITE_APP_NAME not set)'

export default function Home() {
  return (
    <main>
      <h1>🚀 {appName}</h1>
      <p>
        This line comes from the build-time environment variable{' '}
        <code>VITE_APP_NAME</code>. Whatever built this app baked its own value in —
        so this text tells you <em>where</em> the bundle you're looking at came from.
      </p>
      <ul>
        <li>Local <code>yarn dev</code> / <code>yarn build</code> reads <code>.env</code></li>
        <li>Vercel reads the value set in the dashboard (Settings → Environment Variables)</li>
      </ul>
    </main>
  )
}
