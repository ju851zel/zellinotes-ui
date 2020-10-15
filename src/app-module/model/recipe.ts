export interface Pagination {
  page: number;
  itemsPerPage: number;
  ascending: boolean;
  sort: PaginationSorting;
}


export enum PaginationSorting {
  Title = 'Title',
  Created = 'Created',
  LastModified = 'Last Modified',
}


export enum UpdateResult {
  Success,
  Error,
  Waiting
}

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

  static from(unit: string): Difficulty | null {
    switch (unit) {
      case 'Easy':
        return Difficulty.EASY;
      case 'Medium':
        return Difficulty.MEDIUM;
      case 'Hard':
        return Difficulty.HARD;
      default:
        return null;
    }
  }
}

export class MeasurementUnit {
  public static KILOGRAMM = 'Kilogram';
  public static GRAMM = 'Gramm';
  public static MILLILITER = 'Milliliter';
  public static LITER = 'Liter';
  public static PIECE = 'Piece';
  public static PACK = 'Pack';

  public static allUnits = [
    MeasurementUnit.KILOGRAMM,
    MeasurementUnit.GRAMM,
    MeasurementUnit.MILLILITER,
    MeasurementUnit.LITER,
    MeasurementUnit.PIECE,
    MeasurementUnit.PACK
  ];

  static shortUnit(unit: MeasurementUnit): string {
    switch (unit) {
      case this.KILOGRAMM: return 'kg.';
      case this.GRAMM: return 'gr.';
      case this.MILLILITER: return 'ml.';
      case this.LITER: return 'l.';
      case this.PIECE: return 'pc.';
      case this.PACK: return 'pack';
    }
  }

  static from(unit: string): MeasurementUnit | null {
    switch (unit) {
      case 'Kilogram':
        return MeasurementUnit.KILOGRAMM;
      case 'Gramm':
        return MeasurementUnit.GRAMM;
      case 'Milliliter':
        return MeasurementUnit.MILLILITER;
      case 'Liter':
        return MeasurementUnit.LITER;
      case 'Piece':
        return MeasurementUnit.PIECE;
      case 'Pack':
        return MeasurementUnit.PACK;
      default:
        return null;
    }
  }

}


export class Ingredient {
  constructor(public id: string,
              public amount: number,
              public title: string,
              public measurementUnit: MeasurementUnit) {
  }

  static from(ing: any): Ingredient | null {
    if (!!ing.id && typeof ing.id === 'string' &&
      !!ing.amount && typeof ing.amount === 'number' &&
      !!ing.title && typeof ing.title === 'string' &&
      !!ing.measurementUnit && typeof MeasurementUnit.from(ing.measurementUnit) !== null) {
      return new Ingredient(ing.id, ing.amount, ing.title, MeasurementUnit.from(ing.measurementUnit));
    }
    return null;
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
              public tags: Array<string>,
              public image: string,
              public instructions: Array<string>,
              public defaultServings: number) {
  }

  static from(recipe: any): Recipe | null {
    return new Recipe(
      recipe.id,
      recipe.cookingTimeInMinutes,
      recipe.created,
      recipe.lastModified,
      recipe.ingredients.map(ing => Ingredient.from(ing)),
      recipe.version,
      recipe.difficulty,
      recipe.description,
      recipe.title,
      recipe.tags,
      recipe.image,
      recipe.instructions,
      recipe.defaultServings);
  }

  static try_from(recipe: any): Recipe | null {
    if (!!recipe.cookingTimeInMinutes && recipe.cookingTimeInMinutes > 0 && typeof recipe.cookingTimeInMinutes === 'number' &&
      !!recipe.created && !isNaN(Date.parse(recipe.created)) &&
      !!recipe.lastModified && !isNaN(Date.parse(recipe.lastModified)) &&
      !!recipe.ingredients && recipe.ingredients.filter(ing => Ingredient.from(ing) === null).length === 0 &&
      !!recipe.version && recipe.version === 1 &&
      !!recipe.difficulty && Difficulty.from(recipe.difficulty) !== null &&
      !!recipe.description && typeof recipe.description === 'string' &&
      !!recipe.title && typeof recipe.title === 'string' &&
      !!recipe.tags && this.isArrayOfStrings(recipe.tags) &&
      recipe.image !== undefined && (typeof recipe.image === 'string' || recipe.image === null) &&
      !!recipe.instructions && this.isArrayOfStrings(recipe.instructions) &&
      !!recipe.defaultServings && typeof recipe.defaultServings === 'number') {
      return new Recipe(
        !!recipe.id ? recipe.id : '0',
        recipe.cookingTimeInMinutes,
        recipe.created,
        recipe.lastModified,
        recipe.ingredients.map(ing => Ingredient.from(ing)),
        recipe.version,
        recipe.difficulty,
        recipe.description,
        recipe.title,
        recipe.tags,
        recipe.image,
        recipe.instructions,
        recipe.defaultServings);
    }
  }

  static isArrayOfStrings(value: any): boolean {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
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

