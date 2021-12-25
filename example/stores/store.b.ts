import type { A1, A2 } from "./store.a"
import type { Auth } from "./store.auth"

export class B1 {
  constructor(private auth: Auth, private a2: A2) {
    // 1. Subscribe to event emitter
    // 2. Pub update
  }

  updateRenderEngine(newReD0) {
    this.renderPilot = newReD0
  }
}
export class B2 {
  constructor(private auth: Auth, private a1: A1) {}
}
