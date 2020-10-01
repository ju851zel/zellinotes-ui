import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../../../services/recipe-service/recipe.service';
import {Difficulty, Recipe} from '../../../../model/recipe';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styles: [],
})
export class RecipeOverviewComponent implements OnInit {

  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  recipes: any;

  ngOnInit(): void {
    this.fetchCurrentTabRecipes();
  }

  createDefaultRecipe(): void {
    this.recipeService.addDefaultRecipe();
  }

  fetchCurrentTabRecipes(): void {
    this.recipeService.fetchAllRecipes();
  }


  downloadRecipes(): void {
    //
  }

  navigateToSingleRecipe(id: string): void {
    this.router.navigate([`/${id}`], {relativeTo: this.activatedRoute});
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
