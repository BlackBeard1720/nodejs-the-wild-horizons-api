export const getDataByPathParam = (data, locationType, locationName) => {
    return data.filter(
        (destination) =>
            destination[locationType].toLowerCase() === locationName.toLowerCase(),
    );
};