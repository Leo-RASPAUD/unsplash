export const userReducerTypes = {
  SET_USER_SEARCH_RESULTS: 'SET_USER_SEARCH_RESULTS',
  SET_USER_TO_SEARCH: 'SET_USER_TO_SEARCH',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_CURRENT_USER_PHOTOS: 'SET_CURRENT_USER_PHOTOS',
  SET_SELECTED_PHOTO: 'SET_SELECTED_PHOTO',
};

const initialState = {
  searchUserResults: [],
  userToSearch: '',
  currentPage: 0,
  currentUser: null,
  photos: [],
  selectedPhoto: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case userReducerTypes.SET_USER_SEARCH_RESULTS:
      return {
        ...state,
        searchUserResults: payload,
      };
    case userReducerTypes.SET_USER_TO_SEARCH:
      return {
        ...state,
        userToSearch: payload,
      };
    case userReducerTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case userReducerTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case userReducerTypes.SET_CURRENT_USER_PHOTOS:
      return {
        ...state,
        photos: payload,
      };
    case userReducerTypes.SET_SELECTED_PHOTO:
      return {
        ...state,
        selectedPhoto: payload,
      };
    default:
      return state;
  }
};
