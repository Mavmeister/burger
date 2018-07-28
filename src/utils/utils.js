const utilities = {
    timer : (state, time, callback) => {
        setTimeout(() => {
            console.log(`Timer done after:${time} seconds. State:${state}`);
            callback()
        }, time)
    }

}


export default utilities;