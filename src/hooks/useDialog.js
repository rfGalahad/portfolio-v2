import { useState, useCallback } from 'react';

export const useDialog = (initial = false) => {
  
  const [open, setOpen] = useState(initial);
  const [data, setData] = useState(null);

  const onOpen  = useCallback((data = null) => { setOpen(true); setData(data); }, []);
  const onClose = useCallback(() => { setOpen(false); setData(null); }, []);
  
  return { 
    open,
    data,
    onOpen, 
    onClose 
  };
};