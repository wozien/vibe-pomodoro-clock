import { memo } from 'react'

const ControlButton = memo(function ControlButton({ children, variant, onClick }) {
  const baseClasses = 'px-6 py-4 text-base font-medium rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none w-[88px]'

  const variantClasses = {
    primary: 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/30',
    secondary: 'bg-white/60 text-rose-500 hover:bg-white shadow-md border border-white/50',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
})

const Controls = memo(function Controls({ isRunning, onStart, onPause, onReset, onSkip }) {
  return (
    <div className="flex gap-2 justify-center mb-10">
      {isRunning ? (
        <ControlButton variant="secondary" onClick={onPause}>
          暂停
        </ControlButton>
      ) : (
        <ControlButton variant="primary" onClick={onStart}>
          开始
        </ControlButton>
      )}
      <ControlButton variant="secondary" onClick={onReset}>
        重置
      </ControlButton>
      <ControlButton variant="secondary" onClick={onSkip}>
        跳过
      </ControlButton>
    </div>
  )
})

export { ControlButton, Controls }
