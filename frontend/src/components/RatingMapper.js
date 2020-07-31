import Ratings from "./StarRating";

const RatingMapper = (ratingName) => {
    switch (ratingName) {
        case "None":
            return Ratings.None;
        case "Bad":
            return Ratings.Bad;
        case "NotBad":
            return Ratings.NotBad;
        case "Good":
            return Ratings.Good.value();
        case "VeryGood":
            return Ratings.VeryGood;
        case "Perfect":
            return Ratings.Perfect;
    }
}

export default RatingMapper