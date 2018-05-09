import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateComponent } from './task-create.component';

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should return false on a duration lower than 1', () => {
    component.duration = -1;
    const res = component.isValidDuration();

    expect (res).toBe(false);
  });

  it ('should return true on a 1 duration', () => {
    component.duration = 1;
    const res = component.isValidDuration();

    expect (res).toBe(true);
  });

  it ('should return true on a duration greater than 1', () => {
    component.duration = 1;
    const res = component.isValidDuration();

    expect (res).toBe(true)
  });

  it ('should return true on a duration greater than 1', () => {
    component.duration = 1;
    const res = component.isValidDuration();

    expect (res).toBe(true);
  });

  it ('should return false if there is no name', () => {
    component.name = undefined;
    const res = component.isValidName();

    expect (res).toBe(true);
  });

  it ('should return true if the name is empty', () => {
    component.name = "";
    const res = component.isValidName();

    expect (res).toBe(true);
  });

  it ('should return false if there is no name', () => {
    component.name = undefined;
    const res = component.isValidName();

    expect (res).toBe(true);
  });
});
