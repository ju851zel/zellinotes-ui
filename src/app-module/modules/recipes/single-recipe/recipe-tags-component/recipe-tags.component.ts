import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-recipe-tags',
  templateUrl: './recipe-tags.component.html',
  styleUrls: ['./recipe-tags.component.css']
})
export class RecipeTagsComponent implements OnInit {

  @Input()
  private recipeId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
