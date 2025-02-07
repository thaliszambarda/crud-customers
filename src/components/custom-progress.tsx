import { useEffect, useState } from "react";

import { Progress } from "./ui/progress";

export function CustomProgress() {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 2 : 0));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <Progress className="absolute bottom-0 left-0 h-1" value={progress} />;
}
