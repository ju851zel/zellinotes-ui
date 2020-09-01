import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleIngredientComponent} from './single-ingredient.component';

describe('SingleIngredientComponent', () => {
  let component: SingleIngredientComponent;
  let fixture: ComponentFixture<SingleIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleIngredientComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
