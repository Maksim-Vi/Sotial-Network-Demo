import React from 'react';
import { create } from "react-test-renderer";
import ProfileStatus from './../components/profile/profileStatus/ProfileStatus';

describe("Test№6: ProfileStatus component", () => {
 // проверка стейта локального 
  test("Test№6.1: status from props should be in the state", () => {
    const component = create(<ProfileStatus status="Test Case Test№6" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("Test Case Test№6");
  });
// проверка тега спан
  test("Test№6.2: after render, app should be show span", () => {
    const component = create(<ProfileStatus status="Test Case Test№6" />);
    const root = component.root;
    let span = root.findByType("span")
    expect(span).not.toBeNull();
  });
// проверка что после рендера не покажет инпут а спан
  test("Test№6.3: after render, app should be show span", () => {
    const component = create(<ProfileStatus status="Test Case Test№6" />);
    const root = component.root;
    expect( () =>{
      let input = root.findByType("input")
    }).toThrow();
  });
// проверка текста в нутри спана и инпута тот что лежит в стейте 
  test("Test№6.4: after cliced span should be show input", () => {
    const component = create(<ProfileStatus status="Test Case Test№6" />);
    const root = component.root;
    let span = root.findByType("span")
    expect(span.children[0]).toBe("Test Case Test№6");
  });
// клик по спану переход в режим редактирования   
  test("Test№6.4: input should be displayed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="Test Case Test№6" />);
    const root = component.root;
    let span = root.findByType("span")
    span.props.onDoubleClick();
    let input = root.findByType("input")
    expect(input.props.value).toBe("Test Case Test№6");
  });
// проверка вызова колбека updateUserStatus
  test("Test№6.5: coolback should be called", () => {
    const mockCallBack = jast.fn()
    const component = create(<ProfileStatus status="Test Case Test№6" updateStatus={mockCallBack} />);
    const instance = component.getInstance();
    instance.updateUserStatus();
    expect(mockCallBack.mock.colls.length).toBe(1);
  });
});
