import { useState, useEffect, useRef, useCallback } from 'react'
import CircularProgress from './components/CircularProgress'
import StatusBadge from './components/StatusBadge'
import { Controls } from './components/Controls'
import TomatoCounter from './components/TomatoCounter'

/**
 * 番茄钟常量配置
 * WORK_TIME: 工作时长 25 分钟
 * BREAK_TIME: 休息时长 5 分钟
 */
const WORK_TIME = 25 * 60
const BREAK_TIME = 5 * 60

/**
 * 获取当天日期字符串，用于 localStorage 键值
 */
const getTodayString = () => new Date().toDateString()

/**
 * 从 localStorage 读取今日番茄数
 * 如果日期不同则重置为 0
 */
const getInitialTomatoes = () => {
  const saved = localStorage.getItem('tomatoesToday')
  const today = getTodayString()
  const savedDate = localStorage.getItem('tomatoesDate')

  if (savedDate !== today) {
    return 0
  }
  return saved ? parseInt(saved, 10) : 0
}

/**
 * 番茄钟主组件
 */
function App() {
  // ==================== 状态定义 ====================
  const [timeLeft, setTimeLeft] = useState(WORK_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorking, setIsWorking] = useState(true)
  const [tomatoesToday, setTomatoesToday] = useState(getInitialTomatoes)

  // ==================== Refs ====================
  const timerRef = useRef(null)
  const audioRef = useRef(null)
  const isWorkingRef = useRef(isWorking)

  // 同步 isWorking 到 ref，避免闭包问题
  useEffect(() => {
    isWorkingRef.current = isWorking
  }, [isWorking])

  // 初始化日期
  useEffect(() => {
    localStorage.setItem('tomatoesDate', getTodayString())
  }, [])

  // 持久化番茄计数
  useEffect(() => {
    localStorage.setItem('tomatoesToday', tomatoesToday.toString())
  }, [tomatoesToday])

  // ==================== 回调函数 ====================

  /**
   * 发送浏览器通知
   */
  const sendNotification = useCallback(() => {
    const title = isWorkingRef.current ? '番茄时间结束！' : '休息结束！'
    const body = isWorkingRef.current ? '是时候休息一下了' : '继续工作吧！'

    if (Notification.permission === 'granted') {
      new Notification(title, { body })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, { body })
        }
      })
    }
  }, [])

  /**
   * 播放提示音
   */
  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }, [])

  /**
   * 计时完成处理
   * - 发送通知和声音
   * - 更新番茄计数（仅在工作时段完成时）
   * - 切换工作/休息状态
   */
  const handleTimerComplete = useCallback(() => {
    sendNotification()
    playSound()

    if (isWorkingRef.current) {
      setTomatoesToday((prev) => prev + 1)
      setIsWorking(false)
      setTimeLeft(BREAK_TIME)
    } else {
      setIsWorking(true)
      setTimeLeft(WORK_TIME)
    }
  }, [sendNotification, playSound])

  /**
   * 启动计时器
   * - 请求通知权限
   * - 设置运行状态
   */
  const handleStart = useCallback(() => {
    Notification.requestPermission()
    setIsRunning(true)
  }, [])

  /**
   * 暂停计时器
   */
  const handlePause = useCallback(() => {
    setIsRunning(false)
  }, [])

  /**
   * 重置计时器
   * 恢复到当前状态（工作/休息）的初始时间
   */
  const handleReset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(isWorking ? WORK_TIME : BREAK_TIME)
  }, [isWorking])

  /**
   * 跳过当前时段
   * 直接切换到下一时段
   */
  const handleSkip = useCallback(() => {
    setIsRunning(false)
    if (isWorking) {
      setTimeLeft(BREAK_TIME)
      setIsWorking(false)
    } else {
      setTimeLeft(WORK_TIME)
      setIsWorking(true)
    }
  }, [isWorking])

  // ==================== 计时器逻辑 ====================
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [isRunning, handleTimerComplete])

  // 计算当前时段总时长
  const totalTime = isWorking ? WORK_TIME : BREAK_TIME

  // ==================== 渲染 ====================
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-linear-to-br from-rose-200 via-pink-200 to-rose-300" />

      {/* 背景纹理 */}
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%27560%27%20height=%27560%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23ffffff%27%20fill-opacity=%270.15%27%3E%3Cpath%20d=%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"
      />

      {/* 提示音音频元素 */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
        preload="auto"
      />

      {/* 主卡片 */}
      <div className="relative bg-white/30 backdrop-blur-2xl rounded-3xl p-16 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/40 ring-1 ring-white/50">
        <div className="text-center">
          {/* 标题 */}
          <h1 className="text-5xl font-light text-rose-600 mb-2 tracking-tight">番茄钟</h1>
          <p className="text-rose-400/80 text-sm font-medium mb-8">Pomodoro Timer</p>

          {/* 状态标签 */}
          <StatusBadge isWorking={isWorking} />

          {/* 圆形进度计时器 */}
          <CircularProgress
            timeLeft={timeLeft}
            totalTime={totalTime}
            isWorking={isWorking}
          />

          {/* 控制按钮 */}
          <Controls
            isRunning={isRunning}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onSkip={handleSkip}
          />

          {/* 番茄计数 */}
          <TomatoCounter count={tomatoesToday} />
        </div>
      </div>

      {/* 底部标语 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-rose-400/60 text-xs font-light">
        专注 · 高效 · 生活
      </div>
    </div>
  )
}

export default App
