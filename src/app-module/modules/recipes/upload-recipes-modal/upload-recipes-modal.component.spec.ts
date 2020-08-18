import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRecipesModalComponent } from './upload-recipes-modal.component';

describe('UploadRecipesModalComponent', () => {
  let component: UploadRecipesModalComponent;
  let fixture: ComponentFixture<UploadRecipesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRecipesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRecipesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
