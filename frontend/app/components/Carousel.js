// frontend/components/Carousel.js
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';

const images = ['/fuels.png'];

const StyledCarousel = styled(Carousel)`
  width: 100%; /* Make the carousel full width */

  .carousel .slide {
    background: none;
  }

  .carousel .control-dots {
    bottom: 10px; /* Adjust the position of the dots */
  }

  .carousel .thumbs-wrapper {
    display: none; /* Hide the thumbnails */
  }

  .carousel .carousel-slider {
    height: 150px; /* Adjust the height of the carousel */
  }

  .carousel .slide img {
    width: 100%; /* Ensure the image takes up the full width */
    height: 400px; /* Set the height of the image */
    object-fit: cover; /* Crop the image to fit the carousel */
  }
`;

const ImageCarousel = () => {
  return (
    <StyledCarousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      showArrows
    >
      {images.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </StyledCarousel>
  );
};

export default ImageCarousel;