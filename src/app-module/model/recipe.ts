export class Difficulty {
  public static EASY = new Difficulty(0, 'Easy');
  public static MEDIUM = new Difficulty(1, 'Medium');
  public static HARD = new Difficulty(2, 'Hard');

  private constructor(public level: number,
                      public description: string) {
  }

  isEasyDifficulty(): boolean {
    return this.level === Difficulty.EASY.level &&
      this.description === Difficulty.EASY.description;
  }

  isMediumDifficulty(): boolean {
    return this.level === Difficulty.MEDIUM.level &&
      this.description === Difficulty.MEDIUM.description;
  }

  isHardDifficulty(): boolean {
    return this.level === Difficulty.HARD.level &&
      this.description === Difficulty.HARD.description;
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
  constructor(public id: number,
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
              public tags: Set<string>,
              public image: string,
              public instructions: Array<string>,
              public defaultServings: number) {
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

