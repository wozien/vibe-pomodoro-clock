import { memo } from 'react'

const TomatoCounter = memo(function TomatoCounter({ count }) {
  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60">
      <span className="text-2xl">🍅</span>
      <span className="text-rose-600/70 font-medium">今日完成</span>
      <span className="text-rose-600 font-semibold text-lg">{count}</span>
      <span className="text-rose-600/70 font-medium">个</span>
    </div>
  )
})

export default TomatoCounter
