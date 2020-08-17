import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.css']
})
export class RecipeOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  createRecipe() {
    //
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
