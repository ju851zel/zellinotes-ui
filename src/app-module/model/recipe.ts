export class Difficulty {
  public static EASY = new Difficulty(0, 'Easy');
  public static MEDIUM = new Difficulty(1, 'Medium');
  public static HARD = new Difficulty(2, 'Hard');

  private constructor(private level: number,
                      private description: string) {
  }

  isEasyDifficulty(): boolean {
    return Difficulty.EASY === this;
  }

  isMediumDifficulty(): boolean {
    return Difficulty.MEDIUM === this;
  }

  isHardDifficulty(): boolean {
    return Difficulty.HARD === this;
  }
}

export class MeasurementUnit {
  public static KILOGRAMM = new MeasurementUnit('kg', 'kilogram');
  public static GRAMM = new MeasurementUnit('gr', 'gramm');
  public static MILLILITER = new MeasurementUnit('ml', 'milliliter');
  public static LITER = new MeasurementUnit('l', 'liter');
  public static PIECE = new MeasurementUnit('pc', 'piece');
  public static PACK = new MeasurementUnit('pk', 'pack');

  public static allUnits = [
    MeasurementUnit.KILOGRAMM,
    MeasurementUnit.GRAMM,
    MeasurementUnit.MILLILITER,
    MeasurementUnit.LITER,
    MeasurementUnit.PIECE,
    MeasurementUnit.PACK
  ];

  private constructor(readonly abbreviation: string,
                      readonly title: string) {
  }

}


export class Ingredient {
  constructor(readonly id: number,
              readonly amount: number,
              readonly title: string,
              readonly measurementUnit: MeasurementUnit) {
  }

  copy(): Ingredient {
    return new Ingredient(
      this.id,
      this.amount,
      this.title,
      this.measurementUnit
    );
  }
}

export class Recipe {
  constructor(readonly id: string,
              readonly totalTime: number,
              readonly created: Date,
              readonly lastModified: Date,
              readonly ingredients: Array<Ingredient>,
              readonly version: number,
              readonly difficulty: Difficulty,
              readonly description: string,
              readonly title: string,
              readonly tags: Set<string>,
              readonly image: string,
              readonly instructions: Array<string>,
              readonly defaultServings: number) {
  }

  copyButTitle(newTitle: string): Recipe {
    return new Recipe(
      this.id,
      this.totalTime,
      this.created,
      this.lastModified,
      this.ingredients,
      this.version,
      this.difficulty,
      this.description,
      newTitle,
      this.tags,
      this.image,
      this.instructions,
      this.defaultServings);
  }

  copyButDescription(newDescription: string): Recipe {
    return new Recipe(
      this.id,
      this.totalTime,
      this.created,
      this.lastModified,
      this.ingredients,
      this.version,
      this.difficulty,
      newDescription,
      this.title,
      this.tags,
      this.image,
      this.instructions,
      this.defaultServings);
  }

  copyButDifficulty(difficulty: Difficulty): Recipe {
    return new Recipe(
      this.id,
      this.totalTime,
      this.created,
      this.lastModified,
      this.ingredients,
      this.version,
      difficulty,
      this.description,
      this.title,
      this.tags,
      this.image,
      this.instructions,
      this.defaultServings);
  }

  copyButDefaultServings(servings: number): Recipe {
    return new Recipe(
      this.id,
      this.totalTime,
      this.created,
      this.lastModified,
      this.ingredients,
      this.version,
      this.difficulty,
      this.description,
      this.title,
      this.tags,
      this.image,
      this.instructions,
      servings);
  }

  copyButTotalTime(totalTime: number): Recipe {
    return new Recipe(
      this.id,
      totalTime,
      this.created,
      this.lastModified,
      this.ingredients,
      this.version,
      this.difficulty,
      this.description,
      this.title,
      this.tags,
      this.image,
      this.instructions,
      this.defaultServings);
  }

  copyButTags(tags: Set<string>): Recipe {
    return new Recipe(
      this.id,
      this.totalTime,
      this.created,
      this.lastModified,
      this.ingredients,
      this.version,
      this.difficulty,
      this.description,
      this.title,
      tags,
      this.image,
      this.instructions,
      this.defaultServings);
  }

  copyButAddInstruction(instruction: string): Recipe {
    const instructions = Object.assign([], this.instructions);
    instructions.push(instruction);
    return new Recipe(
      this.id,
      this.totalTime,
      this.created,
      this.lastModified,
      this.ingredients,
      this.version,
      this.difficulty,
      this.description,
      this.title,
      this.tags,
      this.image,
      instructions,
      this.defaultServings);
  }

  copyButInstructions(instructions: Array<string>): Recipe {
    return new Recipe(
      this.id,
      this.totalTime,
      this.created,
      this.lastModified,
      this.ingredients,
      this.version,
      this.difficulty,
      this.description,
      this.title,
      this.tags,
      this.image,
      instructions,
      this.defaultServings);
  }

  copyButChangeInstruction(index: number, instruction: string): Recipe {
    const instructions = [...this.instructions];
    instructions[index] = instruction;
    console.log('new instructions', instructions);
    return new Recipe(
      this.id,
      this.totalTime,
      this.created,
      this.lastModified,
      this.ingredients,
      this.version,
      this.difficulty,
      this.description,
      this.title,
      this.tags,
      this.image,
      instructions,
      this.defaultServings);
  }

  copyButIngredients(ingredients: Array<Ingredient>): Recipe {
    return new Recipe(
      this.id,
      this.totalTime,
      this.created,
      this.lastModified,
      ingredients,
      this.version,
      this.difficulty,
      this.description,
      this.title,
      this.tags,
      this.image,
      this.instructions,
      this.defaultServings);
  }
}

