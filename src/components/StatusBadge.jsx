import { memo } from 'react'

const StatusBadge = memo(function StatusBadge({ isWorking }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium mb-8 transition-all duration-500 ${
        isWorking
          ? 'bg-rose-500/20 text-rose-600'
          : 'bg-emerald-500/20 text-emerald-600'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isWorking ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'
        }`}
      />
      {isWorking ? '工作时间' : '休息时间'}
    </div>
  )
})

export default StatusBadge
