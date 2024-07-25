"use client"
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function CurrentDate() {
  const [chileDate, setChileDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateChileDate = () => {
      const now = new Date();

      const chileDateString = new Intl.DateTimeFormat('es-CL', {
        timeZone: 'America/Santiago',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(now);

      setChileDate(chileDateString);
      setLoading(false);
    };


    updateChileDate();

    const intervalId = setInterval(updateChileDate, 24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <span>
      {loading ? (
        <Skeleton className="w-[62px] h-[23px] mt-[2px]" /> 
      ) : (
        chileDate
      )}
      </span>
    </div>
  );
}

export default CurrentDate;
