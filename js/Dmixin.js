const _ = require('lodash')

let dmixin = {
    hello: "word",
    data() {
        return {
            demo: "demo",
        }
    },
    props: {
        superRef: {
            type: String,

        },
    },
    computed: {},
    methods: {
        doMethod(superRef, method, data) {
            if (!_.isNil(this.superRef)) {
                const event = superRef + "." + method;
                this.$listen.$emit(event, data);
            }
        }
    },
    destroyed() {
        if (!_.isNil(this.superRef)) {
            for (let key in this.$options.methods) {
                const m = key;
                const allMethod = this.$options.hello + "." + m
                this.$listen.$off(allMethod);
                // console.log("destroy"+allMethod )
            }
        }
    },
    mounted() {
        this.$options.hello = this.superRef;
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        if (!_.isNil(this.superRef)) {
            for (let key in this.$options.methods) {
                const m = key;
                const allMethod = this.$options.hello + "." + m
                // console.log("create listen"+allMethod)
                this.$listen.$off(allMethod);
                this.$listen.$on(allMethod, this.$options.methods[key])
            }
        }
    }
}
export {dmixin};

