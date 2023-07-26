import { useState } from 'react';

const useCopyClipboard = () => {
  const [isCopy, setIsCopy] = useState(false);

  const doCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);

      return true;
    } catch (error) {
      setIsCopy(false);

      return false;
    }
  };

  return { isCopy, doCopy };
};

export default useCopyClipboard;
