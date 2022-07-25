import { useEffect, useState } from "react";

function useCopyToClipboard(notifyTimeout = 2000) {
  const [copiedText, setCopiedText] = useState(null);
  const [copyStatus, setCopyStatus] = useState("inactive");

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setCopyStatus("copied");
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      setCopyStatus("failed");
      return false;
    }
  };

  useEffect(() => {
    if (copyStatus === "inactive") {
      return;
    }

    const timeoutId = setTimeout(
      () => setCopyStatus("inactive"),
      notifyTimeout
    );

    return () => clearTimeout(timeoutId);
  }, [copyStatus, notifyTimeout]);

  return { copiedText, copy, copyStatus };
}

export default useCopyToClipboard;
