export const recordAction = (
  duration,
  avgSpeed,
  distance,
  id,
  startCoord,
  endCoords,
  dateStart,
) => {
  return {
    type: 'RECORD',
    payload: {
      duration,
      avgSpeed,
      distance,
      id,
      startCoord: {
        latitude: startCoord.latitude,
        longitude: startCoord.longitude,
      },
      endCoords: {latitude: endCoords.latitude, longitude: endCoords.longitude},
      dateStart,
    },
  };
};

export const getRecordAction = () => {
  return {
    type: 'GET_RECORD',
  };
};

export const deleteRecordAction = (id) => {
  return {
    type: 'DELETE_RECORD',
    payload: id,
  };
};
