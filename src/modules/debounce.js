import {CancelerToken} from "@/service/base";

function Debounce(func, delay) {
    //My custom and universal code for debounce
    this.timeoutId = undefined
    this.func = func
    this.delay = delay
    this.request = undefined
    this.source = CancelerToken()
    this.run = async (val) => {
        if (this.request) {
            await this.reset()
        }
        return () => {
            clearTimeout(this.timeoutId);
            return new Promise((resolve, reject) => {
                this.timeoutId = setTimeout(() => {
                    this.request = true
                    resolve(this.func(val, this.source.token));
                }, this.delay);
            })
        }
    }
    this.reset = async () => {
        await this.source.cancel()
        this.request = undefined
        this.source = CancelerToken()
    }
}


export {
    Debounce
}
