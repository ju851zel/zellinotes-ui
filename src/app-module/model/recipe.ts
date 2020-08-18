export class Difficulty {
  public static EASY = new Difficulty(0, 'Easy');
  public static MEDIUM = new Difficulty(1, 'Medium');
  public static HARD = new Difficulty(2, 'Hard');

  private constructor(private level: number,
                      private description: string) {
  }

}

export class MeasurementUnit {
  public static KILOGRAMM = new MeasurementUnit('kg', 'kilogram');
  public static GRAMM = new MeasurementUnit('gr', 'gramm');
  public static MILLILITER = new MeasurementUnit('ml', 'milliliter');
  public static LITER = new MeasurementUnit('l', 'liter');
  public static PIECE = new MeasurementUnit('pc', 'liter');
  public static PACK = new MeasurementUnit('pk', 'pack');

  private constructor(private abbreviation: string,
                      private title: string) {
  }

}


export class Ingredient {
  id: string;
  amount: number;
  title: string;
  measurementUnit: MeasurementUnit;
}

export class Recipe {
  constructor(public id: string,
              public totalTime: string,
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

}
