import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  imageWidth: number;
  newImageWidth: (width: number) => void;
  frameSize: number;
  newFrameSize: (size: number) => void;
  currentStep: number;
  newStep: (step: number) => void;
  animationSpeed: number;
  newSpeed: (speed: number) => void;
  currentPosition: number;
  newPosition: (position: number) => void;
}

export const Carousel: React.FC<Props> = ({
  imageWidth,
  newImageWidth,
  frameSize,
  newFrameSize,
  images,
  currentStep,
  newStep,
  animationSpeed,
  newSpeed,
  currentPosition,
  newPosition,
}) => {
  return (
    <div className="main">
      <div className="Carousel">
        <ul className="Carousel__list">
          {images.map((src, index) => (
            <li key={index}>
              <img src={src} alt={`${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={() => {
            const carouselList = document.querySelector(
              '.Carousel__list',
            ) as HTMLUListElement;
            const maxNegative = 0;
            const stepPx = currentStep * 130;

            let nextPosition = currentPosition + stepPx;

            if (nextPosition > maxNegative) {
              nextPosition = maxNegative;
            }

            newPosition(nextPosition);
            carouselList.style.transform = `translateX(${nextPosition}px)`;
          }}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={() => {
            const carouselList = document.querySelector(
              '.Carousel__list',
            ) as HTMLUListElement;
            const maxNegative = -((10 - frameSize) * imageWidth);
            const stepPx = currentStep * 130;

            let nextPosition = currentPosition - stepPx;

            if (nextPosition < maxNegative) {
              nextPosition = maxNegative;
            }

            newPosition(nextPosition);
            carouselList.style.transform = `translateX(${nextPosition}px)`;
          }}
        >
          Next
        </button>
      </div>

      <div className="Carousel__settings">
        <label htmlFor="imageWidth" className="Carousel__label">
          Image width
          <input
            id="imageWidth"
            type="number"
            min="50"
            max="300"
            step="10"
            value={imageWidth}
            onChange={ev => {
              const newSize = Number(ev.target.value);

              newImageWidth(newSize);

              const carousel = document.querySelector('.Carousel');
              const imgs = carousel?.querySelectorAll('img');

              imgs?.forEach(img => {
                const picture = img;

                picture.style.width = `${newSize}px`;
                picture.style.height = `${newSize}px`;
              });
            }}
          />
        </label>
        <label htmlFor="frameSize" className="Carousel__label">
          Frame size
          <input
            id="frameSize"
            type="number"
            min="2"
            max="5"
            value={frameSize}
            onChange={ev => {
              const newWidth = Number(ev.target.value);

              newFrameSize(newWidth);
              const carousel = document.querySelector(
                '.Carousel',
              ) as HTMLDivElement;

              carousel.style.width = `${newWidth * 130}px`;
            }}
          />
        </label>
        <label htmlFor="step" className="Carousel__label">
          Step
          <input
            id="step"
            type="number"
            min="1"
            max="3"
            value={currentStep}
            onChange={ev => {
              newStep(Number(ev.target.value));
            }}
          />
        </label>
        <label htmlFor="animationDuration" className="Carousel__label">
          Animation duration
          <input
            id="animationDuration"
            type="number"
            min="300"
            max="3000"
            step="100"
            value={animationSpeed}
            onChange={ev => {
              const newValOfSpeed = Number(ev.target.value);

              newSpeed(newValOfSpeed);
              const carouselList = document.querySelector(
                '.Carousel__list',
              ) as HTMLUListElement;

              carouselList.style.transition = `all ${newValOfSpeed}ms ease-out`;
            }}
          />
        </label>
      </div>
    </div>
  );
};
