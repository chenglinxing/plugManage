/**
 * @description 函数节流:在设置的时间内，只会触发一次函数调用
 * @param {*} fn 
 * @param {*} delay 
 */
export function throttle(fn, wait) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                fn.apply(context, args);
                timer = null;
            }, wait)
        }
    }
}
export function test() {
    console.log('我是test')
}


/**
 * @description 函数防抖：在设置的时间内，对于连续的事件只需要执行一次回调
 * @param {*} fn 
 * @param {*} delay 
 */
export function debounce(fn, delay) {
    let timer = null;
    return function() {
        let _this = this;
        let args = arguments;
        console.log(_this, args, '防抖')
        if (timer) {
            clearTimeout(timer)
            console.log("清除定时器")
        }
        console.log(timer, 'timer')
        timer = setTimeout(function() {
            fn.apply(_this, args)
            timer = null;
        }, delay)
    }
}


/**
 * @description 手动封装call
 * @param {*} thisArgs 
 * @param {*} arguments 
 */
// export function call_new(thisArgs, arguments) {
//     if (!thisArgs) {
//         thisArgs = typeof window === 'undefined' ? global : window
//     }

//     thisArgs.func = this

// }


/**
 * @description 取出两个数组的交集
 * @param {*} firstArr 
 * @param {*} secondArr 
 */
export function getIntersect(firstArr, secondArr) {
    //取出交集的数组
    let intertsectArr;
    //首先判断输入的两个参数是否为数组
    if (Array.isArray(firstArr) && Array.isArray(secondArr)) {
        intertsectArr = firstArr.filter(i => {
            return secondArr.includes(i)
        })
    } else {
        return '请输入两个有效的数组'
    }
    return intertsectArr
}


export function throttle_test(fn, delay) {
    var timer;
    console.log(timer, '外面的timer')
    return function() {
        let _this = this;
        let args = arguments
            // clearTimeout(timer)
        console.log(timer, 'return')
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            console.log(timer, '前面')
            fn.apply(_this, args)
            timer = null
            console.log(timer, '后面')
        }, delay);
    }
}