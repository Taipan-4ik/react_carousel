import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  imageWidth: number;
  newImageWidth: (width: number) => void;
  frameSize: number;
  newFrameSize: (size: number) => void;
  currentOrder: string[];
  newOrder: (imgOrder: string[]) => void;
  currentStep: number;
  newStep: (step: number) => void;
  animationSpeed: number;
  newSpeed: (speed: number) => void;
}

export const Carousel: React.FC<Props> = ({
  // images,
  imageWidth,
  newImageWidth,
  frameSize,
  newFrameSize,
  currentOrder,
  newOrder,
  currentStep,
  newStep,
  animationSpeed,
  newSpeed,
}) => {
  const imgElements = document.querySelectorAll<HTMLImageElement>('img');
  const carouselList = document.querySelector(
    '.Carousel__list',
  ) as HTMLUListElement;

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {currentOrder.map((src, index) => (
          <li key={index}>
            <img src={src} alt={`${index + 1}`} />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={() => {
            const newList = new Array(currentOrder.length);

            for (let i = 0; i < currentOrder.length; i++) {
              const newIndex = (i + currentStep) % currentOrder.length;

              newList[newIndex] = currentOrder[i];
            }

            newOrder(newList);
          }}
        >
          Prev
        </button>

        <button
          type="button"
          onClick={() => {
            const newList = new Array(currentOrder.length);

            for (let i = 0; i < currentOrder.length; i++) {
              const newIndex =
                (i - currentStep + currentOrder.length) % currentOrder.length;

              newList[newIndex] = currentOrder[i];
            }

            newOrder(newList);
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
              newImageWidth(Number(ev.target.value));

              imgElements.forEach(img => {
                const originalImg = img;

                originalImg.style.width = `${ev.target.value}px`;
                originalImg.style.height = `${ev.target.value}px`;
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
              newFrameSize(Number(ev.target.value));

              carouselList.style.width = `${+ev.target.value * 130}px`;
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
              carouselList.style.transition = `all ${newValOfSpeed}ms ease-out`;
            }}
          />
        </label>
      </div>
    </div>
  );
};

// {/* <button
//   type="button"
//   onClick={() => {
//     const newList = new Array(currentOrder.length);

//     for (let i = 0; i < currentOrder.length; i++) {
//       const newIndex =
//         (i - currentStep + currentOrder.length) % currentOrder.length;

//       newList[newIndex] = currentOrder[i];
//     }

//     newOrder(newList);
//   }}
// >
//   Next
// </button>; */}
