function CalculateDistance(lat1, lon1, lat2, lon2) {

    function toRad(Value) {
        return Value * Math.PI / 180;
    }
    let R = 6371;

    let dLat = toRad(lat2 - lat1);
    let dLon = toRad(lon2 - lon1);
    let llat1 = toRad(lat1);
    let llat2 = toRad(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(llat1) * Math.cos(llat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = Math.round(R * c);

    return d;
}

module.exports = {
    CalculateDistance
}
