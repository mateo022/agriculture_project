import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmMainViewComponent } from './farm-main-view.component';

describe('FarmMainViewComponent', () => {
  let component: FarmMainViewComponent;
  let fixture: ComponentFixture<FarmMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmMainViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarmMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
