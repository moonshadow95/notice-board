import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarEmpty} from "@fortawesome/free-regular-svg-icons";
import StarRatingComponent from "react-star-rating-component-new";

const Rate = ({value, size}) => (
    <StarRatingComponent
        name="productRating"
        editing={false}
        renderStarIcon={() => (
            <FontAwesomeIcon
                icon={faStar}
                size={size}
                style={{ color: "rgb(253, 186, 73)" }}
            />
        )}
        renderStarIconHalf={() => (
            <FontAwesomeIcon
                icon={faStarHalfAlt}
                size={size}
                style={{ color: "rgb(253, 186, 73)" }}
            />
        )}
        renderEmptyStarIcon={() => (
            <FontAwesomeIcon
                icon={faStarEmpty}
                size={size}
                style={{ color: "rgb(253, 186, 73)" }}
            />
        )}
        starCount={5}
        value={value}/>
);

export default Rate;