//Converts degree to direction
////Objective is to divide direction into 8 planes and check where degree lies, 0 degree at 12 o'clock going clockwise
export default (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    let converted = Math.round((degrees * 8 / 360));
    return directions[converted % 8];
  }