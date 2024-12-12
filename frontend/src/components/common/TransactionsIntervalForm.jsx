import React, { useEffect, useState } from 'react';

export default function TransactionsIntervalForm({countDown}) {
  const [time, setTime] = useState(1);

  useEffect(() => {
    handleTimeIntervalSubmission();
  }, []);

  const handleTimeIntervalSubmission = async () => {
    try {

      const response = await fetch('http://localhost:4000/api/transactions/set-cron-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ time }),
      });

      if (!response.ok) {
        throw new Error('Failed to set cron job');
      }

      const data = await response.json();
      
      console.log('Cron job set successfully:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
          <div className="2xl:ms-[155px] xl:ms-[120px] lg:ms-[95px] md:ms-[60px] sm:ms-[30px] ms-[6px] xl:pt-[140px] lg:pt-[100px] md:pt-[70px] sm:pt-[42px] pt-[40px] md:pb-[24px] sm:pb-[42px] pb-[42px] md:me-[110px] sm:me-[70px]">
            <h1 className="text-white text-[26px] sm:text-[35px] md:text-[57px] font-[VioletSans]">
              Transactions
            </h1>
            <p className="font-light text-[#EEEEEE] my-[11px] sm:my-[15px] md:my-[20px] lg:my-[26px] font-[RobotoMonoLight] xl:text-[20px] lg:text-[18px] md:text-[18px] sm:text-[16px] text-[14px] leading-tight tracking-widest pe-[6px]">
              Enter the interval in minutes
            </p>
            <form>
              <input
                type="number"
                className="w-full block my-[20px] p-2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <button
                className="clipButton font-[Nippo]"
                onClick={handleTimeIntervalSubmission}
                type="button"
              >
                Set Interval
              </button>
            </form>
            <div className="text-white sm:text-left md:text-[18px] sm:text-[12px] text-[12px] font-[RobotoMono]">
              <p className="pt-[16px] pb-[24px]">
                {countDown > 0 ? (
                  <span>
                    Your transactions will be refreshed in <span className='text-[#02ebb5]'>{countDown} </span>
                    seconds
                  </span>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
  );
}

