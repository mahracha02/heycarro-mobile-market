
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  colorful?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', colorful = true }) => {
  const sizeClass = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-5xl',
  };

  return (
    <div className={`font-poppins font-bold ${sizeClass[size]}`}>
      {colorful ? (
        <>
          <span className="text-heycarro-blue">Hey</span>
          <span className="text-heycarro-orange">carro</span>
        </>
      ) : (
        <span>Heycarro</span>
      )}
    </div>
  );
};

export default Logo;
