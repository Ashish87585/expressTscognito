import express from 'express'
import { Application } from 'express'

class App {
    public app: Application
    public port: Number
    
    constructor(appInit: { port: Number; middlewares: any; controllers: any }) {
        this.app = express()
        this.port = appInit.port
        this.middlewares(appInit.middlewares)
        this.routes(appInit.controllers)
    }

    public listen () {
        this.app.listen(this.port, () => {
            console.log(`App up on ${this.port}`);
        })
    }

    private middlewares(middlewares: any) {
        middlewares.forEach(middleware => {
            this.app.use(middleware)
        })
    }

    private routes(controllers: any) {
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router)
        })
    }
}

export default App