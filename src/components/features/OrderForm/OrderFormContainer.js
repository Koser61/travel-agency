import {connect} from 'react-redux';
import OrderForm from './OrderForm';
import {getOrderOptions, setOrderOption} from '../../../redux/orderRedux';

const mapStateToProps = state => ({
  options: getOrderOptions(state),
  setOrderOption: setOrderOption(state),
});

const mapDispatchToProps = dispatch => ({
  setOrderOption: options => dispatch(setOrderOption(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
