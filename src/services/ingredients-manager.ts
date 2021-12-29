import { Ingredients } from "../stores/store.ingrediets"
import _sampleSize from "lodash/sampleSize"
import _sample from "lodash/sample"

const INGREDIENTS = [
  "tomatoes",
  "olives",
  "salami",
  "cheese",
  "mushrooms",
  "bell pepper",
  "mozzarella",
] as const

/**
 * Fetches Ingredients from the supermarket
 */
export class IngredientsService {
  public static async buyManyIngredients(): Promise<Ingredients> {
    return this.buyIngredients(150)
  }

  public static async buySomeIngredients(): Promise<Ingredients> {
    return this.buyIngredients(30)
  }

  private static buyIngredients(n = 10): Ingredients {
    let x = new Ingredients()

    for (let i = n; i > 0; i--) {
      let z = _sample(INGREDIENTS)
      if (z != null) {
        x.addNewIngredient(z)
      }
    }
    return x
  }
}
