import { useState, useEffect } from 'react';

interface HeaderProps {
  clubDescription: string;
}

export function Header({ clubDescription }: HeaderProps) {
  const [sessionDate, setSessionDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    setSessionDate(`${day}.${month}.${year}`);
  }, []);

  return (
    <header>
      <div className="header-top">
        <div className="logo">
          VINIL<br />
          OH'S<br />
          CLUB
        </div>
        <div className="session-info">
          <span className="session-date">{sessionDate}</span>
          <span>Last Session</span>
        </div>
      </div>
      <h1>Listening Session</h1>
      <p>{clubDescription}</p>
    </header>
  );
}
