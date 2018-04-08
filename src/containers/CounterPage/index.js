import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increment,
  incrementIfOdd,
  incrementAsync,
  decrement,
} from 'reducers/counter';

import CounterModifier from 'components/Counter';

export default connect(
  (state) => ({
    counter: state.counter,
  }),
  (dispatch) =>
    bindActionCreators(
      { increment, incrementIfOdd, incrementAsync, decrement },
      dispatch,
    ),
)(CounterModifier);
