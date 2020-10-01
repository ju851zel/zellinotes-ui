export class Difficulty {
  public static EASY = 'Easy';
  public static MEDIUM = 'Medium';
  public static HARD = 'Hard';


  static isEasyDifficulty(difficulty): boolean {
    return difficulty === Difficulty.EASY;
  }

  static isMediumDifficulty(difficulty): boolean {
    return difficulty === Difficulty.MEDIUM;
  }

  static isHardDifficulty(difficulty): boolean {
    return difficulty === Difficulty.HARD;
  }
}

export class MeasurementUnit {
  public static KILOGRAMM = new MeasurementUnit('kg.', 'kilogram');
  public static GRAMM = new MeasurementUnit('gr.', 'gramm');
  public static MILLILITER = new MeasurementUnit('ml.', 'milliliter');
  public static LITER = new MeasurementUnit('l.', 'liter');
  public static PIECE = new MeasurementUnit('pc.', 'piece');
  public static PACK = new MeasurementUnit('pk.', 'pack');

  public static allUnits = [
    MeasurementUnit.KILOGRAMM,
    MeasurementUnit.GRAMM,
    MeasurementUnit.MILLILITER,
    MeasurementUnit.LITER,
    MeasurementUnit.PIECE,
    MeasurementUnit.PACK
  ];

  private constructor(public abbreviation: string,
                      public title: string) {
  }

}


export class Ingredient {
  constructor(public id: string,
              public amount: number,
              public title: string,
              public measurementUnit: MeasurementUnit) {
  }

  defined(): boolean {
    return !!this.amount &&
      !!this.title &&
      this.title.length !== 0 &&
      !!this.measurementUnit;
  }

  partlyDefined(): boolean {
    return !!this.amount || !!this.measurementUnit || !!this.title;
  }

  notDefined(): boolean {
    return !this.amount && !this.measurementUnit && !this.title;
  }

  clone(): Ingredient {
    return new Ingredient(
      this.id,
      this.amount,
      this.title,
      this.measurementUnit);
  }
}

export class Recipe {
  constructor(public id: string,
              public cookingTimeInMinutes: number,
              public created: Date,
              public lastModified: Date,
              public ingredients: Array<Ingredient>,
              public version: number,
              public difficulty: Difficulty,
              public description: string,
              public title: string,
              public tags: Set<string> | Array<string>,
              public image: string,
              public instructions: Array<string>,
              public defaultServings: number) {
  }

  static from(recipe: Recipe): Recipe {
    return new Recipe(
      recipe.id,
      recipe.cookingTimeInMinutes,
      recipe.created,
      recipe.lastModified,
      recipe.ingredients.map(ing => ing.clone()),
      recipe.version,
      recipe.difficulty,
      recipe.description,
      recipe.title,
      recipe.tags,
      recipe.image,
      recipe.instructions,
      recipe.defaultServings,
    );
  }

  clone(): Recipe {
    return new Recipe(
      this.id,
      this.cookingTimeInMinutes,
      this.created,
      this.lastModified,
      this.ingredients.map(ing => ing.clone()),
      this.version,
      this.difficulty,
      this.description,
      this.title,
      this.tags,
      this.image,
      this.instructions,
      this.defaultServings,
    );
  }
}

