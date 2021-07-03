import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderOption.scss';

const OrderOptionText = ({currentValue, setOptionValue}) => (
  <input
    className={styles.input}
    value={currentValue}
    onChange={event => setOptionValue(event.currentTarget.value)}
  />
);

OrderOptionText.propTypes = {
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
