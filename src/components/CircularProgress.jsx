import { memo } from 'react'

const SIZE = 280
const STROKE_WIDTH = 8
const RADIUS = (SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const CircularProgress = memo(function CircularProgress({ timeLeft, totalTime, isWorking }) {
  const progress = timeLeft / totalTime
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress)
  const color = isWorking ? '#f43f5e' : '#10b981'

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative mb-10">
      <svg
        width={SIZE}
        height={SIZE}
        className="transform -rotate-90"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={STROKE_WIDTH}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-6xl font-thin font-mono tabular-nums transition-all duration-500 ${isWorking ? 'text-rose-700' : 'text-emerald-600'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  )
})

export default CircularProgress
