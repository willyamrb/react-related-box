import { useEffect } from "react";
import { useState } from "react";

interface useTypeDelayProps {
  callback: (data: string) => void;
  defaultValue?: string;
  delay?: number;
}

const useTypeDelay = ({
  defaultValue = "",
  callback,
  delay = 1200,
}: useTypeDelayProps) => {
  const [data, setData] = useState<string>(defaultValue);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (data.trim() !== "") {
        callback(data);
      }
    }, delay);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [data]);

  useEffect(() => {
    setData(defaultValue);
  }, [defaultValue]);

  return { setData, data };
};

export default useTypeDelay;
