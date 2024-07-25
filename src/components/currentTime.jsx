"use client";
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeString = new Intl.DateTimeFormat('es-CL', {
        timeZone: 'America/Santiago',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, 
      }).format(now);

      setCurrentTime(timeString);
      setLoading(false); 
    };

    updateTime(); 
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <time dateTime={currentTime}>
      {loading ? (
        <Skeleton className="w-[62px] h-[23px]" />
      ) : (
        currentTime
      )}
    </time>
  );
}

export default CurrentTime;
