import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function Loading() {
  const [countOfProgess, setCountOfProgess] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountOfProgess((oldProgress) => {
        if (100 == oldProgress) return 0;
        return Math.min(oldProgress + Math.random() * 8, 160);
      });
    },0.1);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <ProgressBar now={countOfProgess} label={`Baixando dados`} />;
}

export default Loading;
