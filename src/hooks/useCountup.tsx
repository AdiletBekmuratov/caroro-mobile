import { useEffect, useState } from 'react';

const useCountup = (targetDate: number) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(new Date().getTime() - countDownDate);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

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
