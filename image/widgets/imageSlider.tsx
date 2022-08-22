import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import React from "react";

function ImageSlider(props) {

    return (
        <ImageGallery {...props} />
    );
}

export default ImageSlider;

// https://www.npmjs.com/package/react-image-gallery
