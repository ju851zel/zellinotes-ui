import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeUploadCropImageComponent } from './recipe-upload-crop-image.component';

describe('UploadImageComponent', () => {
  let component: RecipeUploadCropImageComponent;
  let fixture: ComponentFixture<RecipeUploadCropImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeUploadCropImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeUploadCropImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
