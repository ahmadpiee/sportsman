export const editUserAction = (name, gender, level) => {
  return {
    type: 'EDIT_USER',
    payload: {name, gender, level},
  };
};

export const getProfileAction = () => {
  return {
    type: 'GET_USER',
  };
};

export const editImageAction = ({uri, fileName, type}) => {
  return {
    type: 'EDIT_IMAGE',
    payload: {uri, fileName, type},
  };
};

export const editPasswordAction = (pass) => {
  return {
    type: 'EDIT_PASSWORD',
    payload: pass,
  };
};
