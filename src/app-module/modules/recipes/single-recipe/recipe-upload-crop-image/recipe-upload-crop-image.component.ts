import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-recipe-upload-crop-image',
  templateUrl: './recipe-upload-crop-image.component.html',
  styleUrls: ['./recipe-upload-crop-image.component.css']
})
export class RecipeUploadCropImageComponent implements OnInit {
  @Input()
  private recipeId: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
