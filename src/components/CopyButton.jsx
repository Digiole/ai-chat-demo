import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';

function CopyButton({ text }) {
  const [isCopied, setisCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setisCopied(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied]);

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      setisCopied(true);
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
    }
  }

  return (
    <div>
      {!isCopied ? (
        <button shape="round" onClick={() => copyToClipboard(text)}>
          <CopyIcon />
        </button>
      ) : (
        <button shape="round" disabled>
          <CheckIcon />
        </button>
      )}
    </div>
  );
}

export default CopyButton;
