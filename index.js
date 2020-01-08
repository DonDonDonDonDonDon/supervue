var dmixin =require('./js/Dmixin').dmixin
var init = function(Vue){
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
}
export {init};
