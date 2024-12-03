import { useState, useCallback } from 'react';

export function useTwoFactor() {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const verifyCode = useCallback(async (code: string) => {
    if (code === '123456') {
      return true;
    }
    setVerificationError('Invalid verification code');
    return false;
  }, []);

  return {
    showTwoFactor,
    verificationError,
    setShowTwoFactor,
    verifyCode,
    setVerificationError,
  };
}