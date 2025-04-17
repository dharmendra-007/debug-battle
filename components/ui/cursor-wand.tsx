'use client';

import { useEffect } from 'react';

const MagicWandCursor: React.FC = () => {
  useEffect(() => {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.position = 'fixed';
    sparkleContainer.style.top = '0';
    sparkleContainer.style.left = '0';
    sparkleContainer.style.width = '100%';
    sparkleContainer.style.height = '100%';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.overflow = 'hidden';
    sparkleContainer.style.zIndex = '9999';
    document.body.appendChild(sparkleContainer);

    const fixedColor = '#FFDB00'; // You can choose any color here

    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.position = 'absolute';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.width = '6px';
      sparkle.style.height = '6px';
      sparkle.style.borderRadius = '50%';

      sparkle.style.backgroundColor = fixedColor;
      sparkle.style.boxShadow = `0 0 6px 2px ${fixedColor}`;
      sparkle.style.pointerEvents = 'none';
      sparkle.style.animation = 'sparkle-fade 0.6s ease-out forwards';

      sparkleContainer.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 600);
    };

    const moveHandler = (e: MouseEvent) => {
      createSparkle(e.clientX, e.clientY);
    };

    document.body.style.cursor = 'url("/cursor.cur"), auto';
    window.addEventListener('mousemove', moveHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      sparkleContainer.remove();
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <style jsx global>{`
      * {
        cursor: url("/cursor.cur"), auto !important;
      }

      input, textarea, select, button {
        cursor: url("/cursor.cur") !important;
      }

      @keyframes sparkle-fade {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(1.8);
        }
      }
    `}</style>
  );
};

export default MagicWandCursor;
