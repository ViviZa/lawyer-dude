import React from 'react';
import {configure, shallow} from "enzyme";
import { MemoryRouter } from 'react-router';
import TemplateDecision from '../pages/TemplateDecision';
import SideNavigation from '../components/SideNavigation';
import ForthButton from '../components/ForthButton';
import BackButton from '../components/BackButton';
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("components of decision-page are rendered", () => {

  let mock = jest.fn();
  const location = {
      state: { ID: 4 }
  };

  const wrapper = shallow(
    <MemoryRouter  initialEntries={['/imagesfrominternet']} initialIndex={0}>
    <TemplateDecision 
      addingPages={() =>{}}
      location = {location}
      history = {mock}/>
    </MemoryRouter>
  );  

  console.log(wrapper.debug());
  expect(wrapper.find(SideNavigation).exists()).toEqual(true);
  expect(wrapper.find(ForthButton)).toBeDefined();
  expect(wrapper.find(BackButton).exists()).toEqual(true);
  expect(wrapper.find('.pagecontent').exists()).toEqual(true);

  wrapper.setState({ textIndex: 1, panels: ["test", "test"] });
  expect(wrapper.find('.answer')).to.equal(true);
});
