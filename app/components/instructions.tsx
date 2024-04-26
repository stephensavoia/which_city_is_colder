import { useState } from 'react';

function Instructions() { 
  const [isActive, setIsActive] = useState(false);

  const handleInstructionsButtonClick = () => {
    setIsActive(!isActive);
  };

  const handleInstructionsTextClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
  };

  const handleCloseButtonClick = () => {
    setIsActive(false);
  };

  return (
    <div className="instructions" onClick={handleInstructionsButtonClick}>
        Instructions
        <div className={`modal ${isActive ? 'active' : ''}`}>
            <div className="close-button" onClick={handleCloseButtonClick}>
              <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#ffffff"/>
              </svg>
            </div>
            <div className='text' onClick={handleInstructionsTextClick}>
                <h2>Instructions</h2>
                <p>Tap on the city that you think has a colder temperature <strong>RIGHT NOW</strong>. All temperature data is from <a href="https://open-meteo.com/en/docs#data-sources">Open-Meteo</a>.</p>
                <p>When guessing, consider the lat/long, elevation, season and time of day of the cities in question. Your geography knowledge will come in handy!</p>
            </div>
        </div>
    </div>
  );
}

export default Instructions;