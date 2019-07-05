import React from 'react';
import {configure, shallow} from "enzyme";
import { MemoryRouter } from 'react-router';
import NoDesicion from '../pages/TemplateNoDesicion';
import SideNavigation from '../components/SideNavigation';
import ForthButton from '../components/ForthButton';
import BackButton from '../components/BackButton';
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("components of nodescision-page are rendered", () => {

  let mock = jest.fn();
  const location = {
      state: { ID: 3 }
  };

  const wrapper = shallow(
    <MemoryRouter  initialEntries={['/introduction']} initialIndex={0}>
    <NoDesicion 
      addingPages={() =>{}}
      location = {location}
      history = {mock}/>
    </MemoryRouter>
  );  

  expect(wrapper.find(SideNavigation)).toBeDefined();
  expect(wrapper.find(ForthButton)).toBeDefined();
  expect(wrapper.find(BackButton)).toBeDefined();
  expect(wrapper.find('.headline')).toBeDefined();
  expect(wrapper.find('.lawyericon')).toBeDefined();
  expect(wrapper.find('.pagecontent')).toBeDefined();
});

