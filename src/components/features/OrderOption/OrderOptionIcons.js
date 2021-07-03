import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import Icon from '../../common/Icon/Icon';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionIcons = ({values, required ,currentValue, setOptionValue}) => (
  <div className={styles.icon}>
    {!required ? '' : (
      <div
        className={currentValue == '' ? `${styles.icon} ${styles.iconActive}` : `${styles.icon}`}
        value=''
        onClick={() => setOptionValue('')}
      >
        <Icon name='times-circle' />
        none
      </div>
    )}
    {values.map(value => (
      <div
        className={currentValue == value.id ? `${styles.icon} ${styles.iconActive}` : `${styles.icon}`}
        key={value.id}
        onClick={() => setOptionValue(value.id)}
      >
        <Icon name={value.icon} />
        {value.name}
        <span className={styles.price}>
          ({formatPrice(value.price)})
        </span>
      </div>
    ))}
  </div>
);

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
  required: PropTypes.bool,
  currentValue: PropTypes.string,
};

export default OrderOptionIcons;
