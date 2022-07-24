import React from "react"
import { observer } from "mobx-react-lite"
import cx from "classnames"
import s from "./PizzaPlace.module.css"
import { useContainer } from "../containers/_container.hooks"

export const PizzaPlace = observer(() => {
  const [pizza] = useContainer().pizzaContainer
  if (!pizza) return <>Pizza Place is loading</>

  const { pizzaPlace, diningTables } = pizza

  return (
    <>
      <div className={cx(s.pizzaPlace, s.bricks)}>
        <h3>Pizza Place: {pizzaPlace.name}</h3>
        <h3>Open?: {pizzaPlace.isOpen ? "true" : "false"}</h3>
        <h3>Dining Tables: {diningTables.tables.length}</h3>

        <KitchenData />
      </div>
    </>
  )
})

export const KitchenData = observer(() => {
  const [kitchenCont] = useContainer().kitchen

  if (!kitchenCont) return <>Kitchen is loading</>

  const { kitchen, orderManager } = kitchenCont
  return (
    <>
      <h3>Kitchen data: ({kitchen.kitchenName})</h3>

      <div className={cx(s.kitchenData)}>
        <div>
          <h4>Orders:</h4>
          <ul>
            {orderManager.orders.map((order, idx) => {
              return (
                <li key={idx}>
                  table: {order.table.name} | pizzastate: {order.pizza.state}
                  <ul>
                    {order.pizza.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient.name}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h4>Ingredients:</h4>
          <Inventory />
        </div>
      </div>
    </>
  )
})

export const Inventory = observer(() => {
  const [kitchenCont] = useContainer().kitchen
  if (!kitchenCont) return <>Kitchen is loading</>
  const { ingredients } = kitchenCont
  return (
    <>
      <ul>
        {ingredients.ingredientsStats.map(([name, count], idx) => (
          <li key={idx}>
            test {name} - {count as string}
          </li>
        ))}
      </ul>
    </>
  )
})
