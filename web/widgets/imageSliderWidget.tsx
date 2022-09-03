import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import React from "react";

function ImageSliderWidget(props) {

    return (
        <ImageGallery {...props} />
    );
}

export default ImageSliderWidget;
