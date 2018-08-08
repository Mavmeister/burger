// Libraries
import { combineReducers } from 'redux';

// Reducers
import ingredients from './ingredients';

const rootReducer = combineReducers({
    ingredients,
  });

  export default rootReducer;