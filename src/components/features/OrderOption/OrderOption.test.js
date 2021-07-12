import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import 'jest-extended';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    expect(shallow(<OrderOption type='text' name='someText'/>)).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should generate title from "name" prop', () => {
    const expectedTitle = 'mockTitle';
    const component = shallow(<OrderOption type='text' name={expectedTitle}/>);

    expect(component.find('.title').text()).toEqual(expectedTitle);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckbox',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
//const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'checkboxes': {
        /* tests for checkboxes */
        it('contains inputs with labels', () => {
          const inputs = renderedSubcomponent.find('input');

          expect(inputs).toBeTruthy();

          expect(inputs.at(0).prop('type')).toEqual('checkbox');
          expect(inputs.at(0).prop('value')).toEqual(mockProps.values[0].id);

          expect(inputs.at(1).prop('type')).toEqual('checkbox');
          expect(inputs.at(1).prop('value')).toEqual(mockProps.values[1].id);
        });

        break;
      }
      case 'date': {
        /* tests for date */
        it('contains DatePicker', () => {
          expect(renderedSubcomponent.find('DatePicker')).toBeTruthy();
        });

        break;
      }
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }
      case 'icons': {
        /* tests for icons */
        it('contains divs with icon class', () => {
          const divs = renderedSubcomponent.find('div');

          expect(divs.length).toBe(mockProps.values.length + 1);
          expect(divs.at(0).prop('className')).toBeOneOf(['icon', 'icon iconActive']);
          expect(divs.at(1).prop('className')).toBeOneOf(['icon', 'icon iconActive']);
          expect(divs.at(2).prop('className')).toBeOneOf(['icon', 'icon iconActive']);
        });

        break;
      }
      case 'number': {
        /* tests for number */
        it('contains input with correct props', () => {
          const input = renderedSubcomponent.find('input[type="number"]');

          expect(input.prop('className')).toEqual('inputSmall');
          expect(input.prop('min')).toEqual(mockProps.limits.min);
          expect(input.prop('max')).toEqual(mockProps.limits.max);
        });

        break;
      }
      case 'text': {
        /* tests for text */
        it('contains input with correct className', () => {
          expect(renderedSubcomponent.prop('className')).toEqual('input');
          expect(renderedSubcomponent).toBeTruthy();
        });

        break;
      }
    }
  });
}
