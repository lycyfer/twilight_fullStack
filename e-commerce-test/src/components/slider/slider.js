import { useState } from "react";
import "./slider.css";

function Slider({ images }) {
    const [imageIndex, setImageIndex] = useState(null);

    const changeSlide = (direction) => {
        if (direction === "left") {
            if (imageIndex === 0) {
                setImageIndex(images.length - 1);
            } else {
                setImageIndex(imageIndex - 1);
            }
        } else {
            if (imageIndex === images.length - 1) {
                setImageIndex(0);
            } else {
                setImageIndex(imageIndex + 1);
            }
        }
    };

    return (
        <div className="slider">
            {imageIndex !== null && (
                <div className="fullSlider">
                    <div className="arrow" onClick={() => changeSlide("left")}>
                        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="imgContainer">
                        <img src={images[imageIndex]} alt="" />
                    </div>
                    <div className="arrow" onClick={() => changeSlide("right")}>
                        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="close" onClick={() => setImageIndex(null)}>
                        X
                    </div>
                </div>
            )}
            <div className="bigImage">
                <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
            </div>
            <div className="smallImages">
                {images.slice(1).map((image, index) => (
                    <img
                        src={image}
                        alt=""
                        key={index}
                        onClick={() => setImageIndex(index + 1)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slider;
