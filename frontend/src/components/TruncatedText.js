export const showSmallDescription = text => {
    if (text.length > 50) {
        text = text.substring(0, 50) + "...";
    }

    if (text.length > 250) {
        text = text.substring(0, 250) + "...";
    }
    return text;
};

export const showSmallTitle = text => {
    if (text.length > 25) {
        text = text.substring(0, 25) + "...";
    }

    if (text.length > 60) {
        text = text.substring(0, 60) + "...";
    }
    return text;
};

export default [showSmallDescription, showSmallTitle]