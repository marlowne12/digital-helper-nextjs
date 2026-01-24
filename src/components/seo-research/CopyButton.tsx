import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  onCopy: () => void;
  copied?: boolean;
}

export function CopyButton({ text, onCopy, copied }: CopyButtonProps) {
  return (
    <button
      onClick={onCopy}
      className="opacity-0 hover:opacity-100 transition-opacity p-2"
      aria-label={`Copy ${text} to clipboard`}
      title="Copy to clipboard"
    >
      {copied ? (
        <CheckCircle className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-zinc-400" />
      )}
    </button>
  );
}
