import React, { useState } from 'react';
import { Github, Copy, Check } from 'lucide-react';

interface CodeDisplayProps {
  repoUrl: string;
  filePath: string;
  code: string;
  language: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ repoUrl, filePath, code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700">
        <div className="flex items-center space-x-2">
          <Github size={20} className="text-gray-600 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{filePath}</span>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href={`${repoUrl}/blob/main/${filePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            View on GitHub
          </a>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check size={20} className="text-green-500" />
            ) : (
              <Copy size={20} className="text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeDisplay;