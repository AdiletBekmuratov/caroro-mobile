import { useEffect, useState } from 'react';

const useCountdown = (targetDate: number) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
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
  const isComplete =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;
  return {
    dd: days,
    hh: padWithLeadingZeros(hours, 2),
    mm: padWithLeadingZeros(minutes, 2),
    ss: padWithLeadingZeros(seconds, 2),
    isComplete,
  };
};

export { useCountdown };
