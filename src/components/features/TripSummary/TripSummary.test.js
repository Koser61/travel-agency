import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  const mockId = 'ID123';

  it('should generate correct link address', () => {
    const component = shallow(<TripSummary  id={'abc'} />);

    expect(component.find('.link').prop('to')).toEqual('/trip/abc');
  });

  it('should render <img> with correct "src" and "alt"', () => {
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'exampleName';
    const component = shallow(<TripSummary id={mockId} image={expectedSrc} name={expectedAlt} />);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct "name", "cost" and "days" props', () => {
    const expectedName = 'mockName';
    const expectedCost = 'mockCost';
    const expectedDays = 7;
    const expectedSrc = 'image.jpg';
    const component = shallow(<TripSummary
      id={mockId}
      image={expectedSrc}
      name={expectedName}
      cost={expectedCost}
      days={expectedDays}
    />);

    expect(component.find('.cost').text()).toEqual('from ' + expectedCost);
    expect(component.find('.days').text()).toEqual(expectedDays + ' days');
    expect(component.find('.title').text()).toEqual(expectedName);
  });

  it('should throw error if any of "id", "image", "name", "cost" or "days" props are missing', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render tags in correct order', () => {
    const expectedTags = ['tag1', 'tag2', 'tag3'];
    const component = shallow(<TripSummary id={mockId} tags={expectedTags}/>);

    expect(component.find('.tag').at(0).text()).toEqual('tag1');
    expect(component.find('.tag').at(1).text()).toEqual('tag2');
    expect(component.find('.tag').at(2).text()).toEqual('tag3');
  });
});
