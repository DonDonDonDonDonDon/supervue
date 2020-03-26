import {dmixin}  from './js/Dmixin'
var superVue = function(Vue){
    Vue.prototype.$listen = new Vue()
    Vue.mixin(dmixin)
    var  superVue = {}
    superVue.callMethod=function(superRef,method,data){
        const event = superRef+"."+method;
        Vue.prototype.$listen.$emit(event, data);
    }
    superVue.call=function(call){
        superVue.callMethod(call.superRef,call.method,call.data)
    }
    Vue.prototype.$superVue =superVue
    return  superVue;
}


// 为组件提供 install 安装方法，供按需引入
superVue.install = function (Vue) {
    superVue.init(Vue)
}

export {superVue};
