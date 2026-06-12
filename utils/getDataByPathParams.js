export const getDataByPathParam = (data, locationType, locationName) => {
    console.log(`location: ${locationType}`);
    console.log('locationName', locationName);
    return data.filter(
        (destination) =>
            destination[locationType].toLowerCase() === locationName.toLowerCase(),
    );
};