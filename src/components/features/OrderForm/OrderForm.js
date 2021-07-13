import React from 'react';
import PropTypes from 'prop-types';

import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';

import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

import { Row, Col } from 'react-flexbox-grid';

const sendOrder = (options, tripId, tripName, tripCountryCode, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    tripId,
    tripName,
    tripCountryCode,
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  if(options.name != '' && options.contact != ''){
    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
};

const OrderForm = ({tripId, tripName, tripCountryCode, tripCost, options, setOrderOption}) => (
  <Row>
    {pricing.map(option => (
      <Col xs={12} md={6} lg={4}  key={option.id}>
        <OrderOption
          {...option}
          currentValue={options[option.id]}
          setOrderOption={setOrderOption}
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options}/>
    </Col>
    <Button onClick={() => sendOrder(options, tripId, tripName, tripCountryCode, tripCost)}>Order now!</Button>
  </Row>
);

OrderForm.propTypes = {
  tripId: PropTypes.string,
  tripName: PropTypes.string,
  tripCountryCode: PropTypes.string,
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
