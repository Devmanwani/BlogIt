import { useState, useEffect } from 'react';

const SelfWritingText = () => {
  const infinite = true;
  const text = "Start your blogging journey Now....";
  const delay = 100;
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let cursorInterval: NodeJS.Timeout;

    if (currentIndex <= text.length) {
     timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      setCurrentIndex(0);
      setCurrentText(''); 
    }

    cursorInterval = setInterval(() => {
      setShowCursor(prevState => !prevState);
    }, 500); 

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [currentIndex, delay, infinite, text]);

  // Text size classes
  const textSizeClasses = ['text-center', 'font-bold', 'sm:text-lg', 'md:text-xl', 'lg:text-2xl', 'xl:text-2xl', '2xl:text-2xl'];

  return (
    <div className='max-w-80 flex justify-center items-center'>
      <div className={textSizeClasses.join(' ')}>
        {currentText}
        <span className={currentIndex <= text.length ? (showCursor ? 'opacity-100' : 'opacity-0') : 'opacity-100'}>|</span>
      </div>
    </div>
  );
};

export default SelfWritingText;
