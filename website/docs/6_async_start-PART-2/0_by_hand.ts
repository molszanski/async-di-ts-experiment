// prettier-ignore
interface Logger { info: (msg: string) => void }
// prettier-ignore
class ConsoleLogger implements Logger { info(msg: string): void { console.log("[Console]:", msg) } }
// prettier-ignore
class PinoLogger    implements Logger { info(msg: string): void { console.log("[Pino]:"   , msg) } }

// Part 1: Business Entities
interface UserData {
  name: string
}

class AuthService {
  async getUserData(): Promise<UserData> {
    return { name: "Big Lebowski" }
  }
}

class User {
  constructor(private data: UserData) {}
  name = () => this.data.name
}

class PaymentService {
  constructor(private readonly logger: Logger, private readonly user: User) {}
  sendMoney() {
    this.logger.info(`Sending monery to the: ${this.user.name()} `)
    return true
  }
}

// Step 2: Manual DI
export async function runMyApp() {
  const logger =
    process.env.NODE_ENV === "production"
      ? new PinoLogger()
      : new ConsoleLogger()

  const auth = new AuthService()
  const user = new User(await auth.getUserData())

  const paymentService = new PaymentService(logger, user)
  paymentService.sendMoney()
}

console.log(" ---- My App START \n\n")
runMyApp().then(() => {
  console.log("\n\n ---- My App END")
})
