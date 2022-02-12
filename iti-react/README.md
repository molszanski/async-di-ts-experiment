<a href="https://www.npmjs.org/package/snow-splash"><img src="https://img.shields.io/npm/v/snow-splash.svg" alt="npm"></a>
![CI](https://github.com/molszanski/snow-splash/actions/workflows/lib-test.yml/badge.svg)
<a href="https://unpkg.com/snow-splash/dist/snow-splash.modern.js"><img src="https://img.badgesize.io/https://unpkg.com/snow-splash/dist/snow-splash.modern.js?compression=gzip" alt="gzip size"></a>

🚧 **library is in alpha dev mode** 🚧

# Snow Splash React

> ~2kB inversion of control container for Typescript/Javascript for constructor injection with a focus on async flow

- **fully async:** merges async code and a constructor injection via async functions

## Usage

```
npm install -S snow-splash-react
```

### Basic Usage

```ts
// React
export const PizzaData = () => {
  const kitchenSet = useContainerSet(["oven", "kitchen"])
  if (!kitchenSet) return <>Kitchen is loading </>
  let inOven = kitchenSet.oven.pizzasInOven()
  return <>Pizzaz In Oven: {inOven}</>
}
```

## API documentation React

### `getContainerSetHooks`

Generates a set of app specific container hooks

```ts
// my-app-hooks.ts
import React, { useContext } from "react"
import { getContainerSetHooks } from "snow-splash"
import { getProviders, PizzaAppContainer } from "./_root.store"

export const MyRootCont = React.createContext(<PizzaAppContainer>{})

let mega = getContainerSetHooks(getProviders, MyRootCont)
export const useContainerSet = mega.useContainerSet
export const useContainerSet = mega.useContainerSet
```

```tsx
// PizzaData.tsx
import { useContainerSet } from "./my-app-hooks"
export const PizzaData = () => {
  const containerSet = useContainerSet((containers) => [containers.kitchen])
  console.log(containerSet)
  return 123
}
```

### `useContainer`

```ts
export const PizzaData = () => {
  const [kitchenContainer, err] = useContainer().kitchen
  if (!kitchenContainer || err) {
    return <>Kitchen is loading</>
  }

  return <>{kitchenContainer.oven.pizzasInOven}</>
}
```

### `useContainerSet`

Get multiple containers and autosubscribes to change.

```ts
export const PizzaData = () => {
  const containerSet = useContainerSet((containers) => [
    containers.kitchen,
    containers.auth,
  ])
  if (!containerSet) {
    return <>Kitchen is loading</>
  }

  return <>{containerSet.kitchen.oven.pizzasInOven}</>
}
```

###

### `generateEnsureContainerSet`

You can create a simpler API for a portion of your applicatoin to avoid dealing with async in every component. There are some helpfull Context helpers at your service. Also you can use classic props drilling to avoid dealing with async flow in every component

```tsx
import React, { useContext } from "react"
import { useContainerSet } from "../containers/_container.hooks"
import { generateEnsureContainerSet } from "snow-splash"

const x = generateEnsureContainerSet(() =>
  useContainerSet(["kitchen", "pizzaContainer", "auth"]),
)
export const EnsureNewKitchenConainer = x.EnsureWrapper
export const useNewKitchenContext = x.contextHook
```

```tsx
export const PizzaApp = () => {
  return (
    <div>
      Pizza App:
      <EnsureNewKitchenConainer
        fallback={<>Pizza App is still loading please wait</>}
      >
        <NewPizzaPlaceControls />
      </EnsureNewKitchenConainer>
    </div>
  )
}
export const PizzaData = () => {
  const { kitchen, pizzaContainer } = useNewKitchenContext()

  return (
    <div>
      <div>Name: {kitchen.kitchen.kitchenName}</div>
      <div>Tables: {pizzaContainer.diningTables.tables}</div>
    </div>
  )
}
```

## Comparison with `inversifyjs`, `tsyringe` and others

## Questions and tips
