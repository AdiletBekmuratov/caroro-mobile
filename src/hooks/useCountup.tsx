import { useEffect, useMemo, useState } from 'react';

const useCountup = (targetDate: string | null) => {
  const countDownDate = useMemo(
    () => new Date(targetDate).getTime(),
    [targetDate],
  );

  const [countDown, setCountDown] = useState(
    new Date().getTime() - countDownDate,
  );

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (targetDate) {
      interval = setInterval(() => {
        setCountDown(new Date().getTime() - countDownDate);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countDownDate]);

  if (!targetDate) {
    return {
      dd: 0,
      hh: padWithLeadingZeros(0, 2),
      mm: padWithLeadingZeros(0, 2),
      ss: padWithLeadingZeros(0, 2),
    };
  }

  return getReturnValues(countDown);
};

function padWithLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, '0');
}

const getReturnValues = (countDown: number) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return {
    dd: days,
    hh: padWithLeadingZeros(hours, 2),
    mm: padWithLeadingZeros(minutes, 2),
    ss: padWithLeadingZeros(seconds, 2),
  };
};

export { useCountup };
