import React from 'react';
import { MemoryRouter } from 'react-router';
import StartButton from '../components/StartButton';
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Startpage from '../pages/Startpage';

configure({ adapter: new Adapter() });


test("startpage is rendered correctly", () => {
  let mock = jest.fn();
  const location = {
      state: { ID: 0 }
  };

  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <Startpage
       addingPages={() =>{}}
       location = {location}
       history = {mock}/>
      />
    </MemoryRouter>
  );
  expect(wrapper.find('.headline').text()).toBe("The Lawyer Dude");
  expect(wrapper.find('.startlawyer')).toBeDefined();
  expect(wrapper.find(StartButton)).toHaveLength(1);
});

