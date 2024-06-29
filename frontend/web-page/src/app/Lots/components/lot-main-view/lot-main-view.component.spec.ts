import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotMainViewComponent } from './lot-main-view.component';

describe('LotMainViewComponent', () => {
  let component: LotMainViewComponent;
  let fixture: ComponentFixture<LotMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotMainViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LotMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
