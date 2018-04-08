export const SET_COUNTER = 'SET_COUNTER';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case SET_COUNTER:
      return action.payload;
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
};

export default counter;


// actions
export const set = (value) => ({
  type: SET_COUNTER,
  payload: value,
});

export const increment = () => ({
  type: INCREMENT_COUNTER,
});

export const decrement = () => ({
  type: DECREMENT_COUNTER,
});

export const incrementIfOdd = () => (dispatch, getState) => {
  const { counter } = getState();

  if (counter % 2 === 0) {
    return;
  }

  dispatch(increment());
};

export const incrementAsync = (delay = 1000) => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};
