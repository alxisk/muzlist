import * as actionTypes from '../constants/actionTypes';

const initialState = {

};

export default function search(state = initialState, action) {
  switch (action.type) {
    case 'SeArCh':
      return {
        ...state,
        search: 'test',
      };
    case 'SeArCh ?':
      return {
        ...state,
        search: 'test',
      };
    default:
      return state;
  }
}
