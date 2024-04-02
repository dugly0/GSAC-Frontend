import { useState } from 'react';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const onClickLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return {
    isLoading,
    onClickLogin
  };
}

export default useLogin;