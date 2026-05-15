import './App.css'
import Timer from './components/Timer.tsx'
import Stopwatch from './components/Stopwatch.tsx'
import { useState } from 'react'

function App() {

  const [tabView, setTabView] = useState(true)

  return (
    <main className="app-shell">
      <section className="app-card">
        <div className="app-header">
          <p className="app-kicker">Time tools</p>
          <h1>Timer & Stopwatch</h1>
          <p className="app-subtitle">
            Clean dark controls with a subtle orange glow for focused timing.
          </p>
        </div>

        <div className="tab-switcher">
          <button
            className={tabView ? 'tab-button active' : 'tab-button'}
            onClick={() => setTabView(true)}
          >
            Timer
          </button>
          <button
            className={!tabView ? 'tab-button active' : 'tab-button'}
            onClick={() => setTabView(false)}
          >
            Stopwatch
          </button>
        </div>

        <div className="panel-frame">{tabView ? <Timer /> : <Stopwatch />}</div>
      </section>
    </main>
  )
}

export default App
