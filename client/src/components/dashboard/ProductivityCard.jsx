/**
 * 🎓 TEACHING MOMENT: ProductivityCard.jsx
 * 
 * WHY THIS EXISTS:
 * A distinct, branded "call-out" card that breaks the visual monotony of white cards.
 * Hardcoding the purple gradient and text gives it emphasis in the layout hierarchy.
 */
export default function ProductivityCard({ completedThisMonth, currentStreak, quote }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl bg-indigo-600 bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 text-white shadow-md shadow-indigo-200">
      <div className="space-y-6">
        <h3 className="text-lg font-bold tracking-tight">Productivity Insights</h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between border-b border-indigo-500/50 pb-4">
            <span className="text-sm font-medium text-indigo-100">Completed this month</span>
            <span className="text-2xl font-extrabold">{completedThisMonth}</span>
          </div>
          
          <div className="flex items-end justify-between">
            <span className="text-sm font-medium text-indigo-100">Current streak</span>
            <span className="text-lg font-bold">{currentStreak} days</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm font-medium italic leading-relaxed text-indigo-100/90">
        {quote}
      </div>
    </div>
  );
}
