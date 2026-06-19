export default function AdSlot({ slot = 'leaderboard', label }) {
  const isDev = import.meta.env.DEV

  const sizeMap = {
    leaderboard: 'max-w-[728px] h-[90px]',
    rectangle: 'max-w-[300px] h-[250px]',
    responsive: 'w-full min-h-[90px]',
  }

  const sizeClass = sizeMap[slot] || sizeMap.leaderboard

  return (
    <div
      className={`flex items-center justify-center w-full mx-auto ${sizeClass}`}
      aria-hidden="true"
    >
      {isDev ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-gray-100 border border-dashed border-gray-300 rounded-md">
          <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400 bg-gray-200 px-2 py-[2px] rounded">
            AD
          </span>

          <span className="text-[11px] text-gray-400">
            {label || slot} · Google AdSense
          </span>
        </div>
      ) : (
        /* Your Production AdSense Script Container goes here later */
        <div className="w-full h-full" />
      )}
    </div>
  )
}