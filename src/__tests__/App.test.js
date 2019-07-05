import React from 'react';
import App from '../App';
import { MemoryRouter } from 'react-router';
import StartButton from '../components/StartButton';
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });


test("startpage is rendered correctly", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find('.headline').text()).toBe("The Lawyer Dude");
  expect(wrapper.find('.startlawyer')).toBeDefined();
  expect(wrapper.find(StartButton)).toHaveLength(1);
});

