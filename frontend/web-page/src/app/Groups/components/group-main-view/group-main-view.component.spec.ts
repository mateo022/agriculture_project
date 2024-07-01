import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMainViewComponent } from './group-main-view.component';

describe('GroupMainViewComponent', () => {
  let component: GroupMainViewComponent;
  let fixture: ComponentFixture<GroupMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupMainViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
