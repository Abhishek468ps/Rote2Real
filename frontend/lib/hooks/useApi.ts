import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

export function useApi<T>(
  apiCall: () => Promise<{ data: T; success: boolean; error?: string }>,
  options: UseApiOptions = {}
) {
  const { immediate = true, retryCount = 3, retryDelay = 1000 } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    let attempts = 0;
    const maxAttempts = retryCount + 1;

    while (attempts < maxAttempts) {
      try {
        const response = await apiCall();
        
        if (response.success) {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
          return;
        } else {
          throw new Error(response.error || 'API call failed');
        }
      } catch (error) {
        attempts++;
        
        if (attempts >= maxAttempts) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : 'An error occurred',
          });
          return;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempts));
      }
    }
  }, [apiCall, retryCount, retryDelay]);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    refetch,
    reset,
  };
}

// Hook for multiple API calls
export function useMultipleApi<T extends Record<string, any>>(
  apiCalls: { [K in keyof T]: () => Promise<{ data: T[K]; success: boolean; error?: string }> }
) {
  const [state, setState] = useState<{
    data: Partial<T> | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await Promise.allSettled(
        Object.entries(apiCalls).map(([key, apiCall]) =>
          apiCall().then((response: any) => ({ key, response }))
        )
      );

      const data: Partial<T> = {};
      const errors: string[] = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const { key, response } = result.value;
          if (response.success) {
            data[key as keyof T] = response.data;
          } else {
            errors.push(`${key}: ${response.error || 'Failed'}`);
          }
        } else {
          errors.push(result.reason);
        }
      });

      setState({
        data: Object.keys(data).length > 0 ? data : null,
        loading: false,
        error: errors.length > 0 ? errors.join(', ') : null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, [apiCalls]);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    ...state,
    refetch,
  };
}



