import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionQuizComponent } from './fraction-quiz.component';

describe('FractionQuizComponent', () => {
  let component: FractionQuizComponent;
  let fixture: ComponentFixture<FractionQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FractionQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
