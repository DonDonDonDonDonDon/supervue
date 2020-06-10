
let dmixin = {
    superRef: null,
    data() {
        return {
            demo: "demo",
        }
    },
    /*props conflicts with ant vue,so use this.$el replace it.*/
    /*
    props: {
        superRef: {
            type: String,
        },
    },*/
    computed: {},
    methods: {
        doMethod(superRef, method, data) {
            if (this.superRef!=null) {
                const event = superRef + "." + method;
                this.$listen.$emit(event, data);
            }
        }
    },
    destroyed() {
        if (this.superRef!=null) {
            for (let key in this.$options.methods) {
                const m = key;
                const allMethod = this.superRef + "." + m
                this.$listen.$off(allMethod);
                // console.log("destroy"+allMethod )
            }
        }
    },
    mounted() {
        /*props conflicts with ant vue,so use this.$el replace it.*/
        try {
            this.superRef =this.$el.getAttribute("superRef");
        }catch (e) {

        }
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        if (this.superRef!=null) {
            for (let key in this.$options.methods) {
                const m = key;
                const allMethod = this.superRef + "." + m
                // console.log("create listen"+allMethod)
                this.$listen.$off(allMethod);
                this.$listen.$on(allMethod, this.$options.methods[key].bind(this))
            }
        }
    }
}
export {dmixin};

