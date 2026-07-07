import { useState } from 'react';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: HiddenValue.jsx
 * 
 * WHY THIS EXISTS:
 * This component encapsulates the core secret-masking behavior:
 * 1. Values are hidden by default (dots) to prevent shoulder-surfing.
 * 2. Users can toggle visibility on demand.
 * 3. A copy button lets users use the value without ever seeing it on screen.
 * 
 * SECURITY NOTE:
 * Even when toggled "visible", the value was already fetched from the server via HTTPS.
 * The frontend never decrypts anything — it just displays what the server returns.
 */
export default function HiddenValue({ value }) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 min-w-0">
      {/* The value itself — masked or revealed */}
      <span className={`text-xs font-mono truncate max-w-[160px] ${
        isVisible ? 'text-slate-700' : 'text-slate-400 tracking-[4px]'
      }`}>
        {isVisible ? value : '••••••••••••••'}
      </span>

      {/* Visibility toggle */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="shrink-0 text-slate-400 hover:text-slate-700 transition p-1 rounded"
        aria-label={isVisible ? 'Hide value' : 'Reveal value'}
        title={isVisible ? 'Hide' : 'Reveal'}
      >
        {isVisible ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`shrink-0 transition p-1 rounded ${
          copied ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-700'
        }`}
        aria-label="Copy value"
        title={copied ? 'Copied!' : 'Copy'}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
