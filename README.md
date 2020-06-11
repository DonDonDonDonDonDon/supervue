
# supervue

if you live,i can find you anywhere

解决了vue跨组件调用的难题

跨组件调用神器
（我们不能做到的，看最后）


## Install

```javascript
$ npm install --save supervue
```

## Usage

### node.js

```javascript
import {superVue}  from "supervue"
import Vue from 'vue'


const $superVue = superVue.init(Vue);
Vue.prototype.$superVue = $superVue

```

## template  child.vue

```html
<template>
  <div>
    <p>hello</p>
  </div>
</template>

<script>
  let vm = this;
  export default {
    name: "TeamplateA",
    data() {
      vm = this
      return {
        text: "hello supervue",
      }
    },
    methods: {
       test1() {
        alert(this.text)
      },
       test2(msg) {
        alert(msg)
      }
    }
  }
</script>

<style lang='scss'>

</style>

```


## vuefile parent.vue

我们可以用superRef 或者 super-ref 给组件起一个个性的名称，一定要独一无二，
后面调用会用到
```html
  <template>
    <div>
      <child :superRef="child-one">i am child-one</child>
      <child :super-ref="child-two">i am child-two</child>
    </div>
  </template>  

```

## parent.vue call child.vue methods
```js

//第一个参数  我们前面用superRef给组件起的名称
//第二个参数  我们组件内的方法
//第三个参数  可以为空，组件方法需要的参数

this.$superVue.callMethod("child-one", "test1",null )
this.$superVue.callMethod("child-two", "test2","msg from supervue" )

```

## you can do like this
```js

//我们可以在任何地方调用其他活跃状态的组件，只要拥有vue实列，也就是this

const obj = {}
obj.superRef = "child-one"
obj.method = "test1"
obj.data = "msg from supervue"

this.$superVue.call(obj)


```



## 注意事项

    1.如果你的组件不处于活跃状态，我们时无法调用的，前提时你的组件要处于活跃状态。
    解决办法，首先激活组件，setTimout ，延迟使用supervue
    
    2.由于做到精准调用，相同名字的superRef,我们只能做到调用最后加载的一个，如果你需要调用所有的相同组件，你可以通过key值，给superRef
    起不同的名字，然后循环调用各个组件
    
    3.以后的版本，我们会解决第二个问题，添加新的方法。
    
    任何问题，和bug，可以联系QQ 751931087

