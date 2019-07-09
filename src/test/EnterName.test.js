import React from 'react';
import {configure, shallow} from "enzyme";
import { MemoryRouter } from 'react-router';
import EnterName from '../pages/EnterName';
import SideNavigation from '../components/SideNavigation';
import ForthButton from '../components/ForthButton';
import BackButton from '../components/BackButton';
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("components of entername-page are rendered", () => {

  let mock = jest.fn();
  const location = {
      state: { ID: 2 }
  };

  const wrapper = shallow(
    <MemoryRouter  initialEntries={['/introduction']} initialIndex={0}>
    <EnterName 
      addingPages={() =>{}}
      location = {location}
      history = {mock}/>
    </MemoryRouter>
  );  

  expect(wrapper.find(SideNavigation)).toBeDefined();
  expect(wrapper.find(ForthButton)).toBeDefined();
  expect(wrapper.find(BackButton)).toBeDefined();
  expect(wrapper.find('entername-form container')).toBeDefined();
  expect(wrapper.find('.lawyericon')).toBeDefined();
  expect(wrapper.find('.pagecontent')).toBeDefined();
});
