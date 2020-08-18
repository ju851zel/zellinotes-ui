import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../../../services/recipe-service/recipe.service';
import {Difficulty, Recipe} from '../../../../model/recipe';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styles: [],
})
export class RecipeOverviewComponent implements OnInit {

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let recipeId = this.activatedRoute.snapshot.params.recipeId;
    console.log(recipeId);
  }

  createRecipe(): void {
    const recipe = new Recipe(
      '0',
      '30',
      new Date(),
      new Date(),
      [],
      1,
      Difficulty.EASY,
      'test description',
      'test title',
      new Set(),
      'https://img.taste.com.au/-RGbsS2h/taste/2019/05/chocolate-and-nutella-smores-cake-149475-2.jpg',
      [],
      2);
    this.recipeService.addRecipe(recipe);
  }

  // tslint:disable-next-line:typedef
  fetchCurrentTabRecipes() {
    //
  }


  // tslint:disable-next-line:typedef
  downloadRecipes() {
    //
  }

  // tslint:disable-next-line:typedef
  recipes: any;

  navigateToSingleRecipe(id: any) {


  }
}

// <script>
// import ModalUploadRecipes from "../../components/recipes/ModalUploadRecipes";
//
// export default {
//   name: "Recipes",
//   components: {ModalUploadRecipes},
//   data() {
//     return {
//       currentTab: 0,
//     }
//   },
//   computed: {
//     hasAccess() {
//       return this.$store.getters.getHasAccess;
//     },
//     getUsersWithRecipes() {
//       return this.$store.getters.getAllUsersWithRecipes;
//     },
//     isSignedIn() {
//       return this.$store.getters.isSignedIn;
//     },
//     activeUserId() {
//       return this.getUsersWithRecipes[this.currentTab].userId
//     },
//     activeUserAlias() {
//       return this.getUsersWithRecipes[this.currentTab].userAlias
//     },
//     activeRecipes() {
//       return this.getUsersWithRecipes[this.currentTab].recipes
//     }
//   },
//   watch: {
//     hasAccess(newVal, oldVal) {
//       const result = newVal.filter(element => !oldVal.find(a => element === a));
//       for (const {userId, userAlias} of result) {
//         this.$store.dispatch("fetchRecipes", {userId, userAlias});
//       }
//     }
//   },
//   created() {
//     this.fetchAllUsersIHaveAccessTo()
//     this.fetchCurrentTabRecipes();
//   },
//   methods: {
//     navigateToSingleRecipe(userId, recipeId) {
//       this.$router.push({name: "singleRecipe", params: {userId, recipeId}})
//     },
//     createRecipe() {
//       const recipeId = this.$uuid.v4();
//       const userId = this.activeUserId;
//       this.$store.dispatch("createDefaultRecipe", {userId, recipeId});
//       this.navigateToSingleRecipe(userId, recipeId)
//     },
//     fetchCurrentTabRecipes() {
//       this.$store.dispatch("fetchRecipes", {userId: this.activeUserId, userAlias: this.activeUserAlias});
//     },
//     downloadRecipes() {
//       this.$store.dispatch("downloadAllRecipesOfUser", {userId: this.activeUserId});
//     },
//     fetchAllUsersIHaveAccessTo() {
//       this.$store.dispatch("fetchAllUsersIHaveAccessTo")
//     },
//   }
// }
