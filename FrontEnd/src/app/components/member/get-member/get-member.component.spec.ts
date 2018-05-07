import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMemberComponent } from './get-member.component';

describe('GetMemberComponent', () => {
  let component: GetMemberComponent;
  let fixture: ComponentFixture<GetMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
