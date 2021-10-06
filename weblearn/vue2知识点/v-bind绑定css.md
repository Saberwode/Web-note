## v-bind绑定css

#### 1.绑定class

直接上官网的例子：

```html
<div :class="classObject"></div>
```

首先，该`div`绑定了一个数据对象为`classobject`

然后将这个对象通过计算属性进行改写

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

`data`中存放两个数据：`isActive`和`error`，这两个数据的状态决定了下面计算属性的结果

`computed`中对`classobject`进行定义，他的返回值有==两种情况==：

- 当`isActive`为真，且`error`也为真时，会返回`active`

- 这个可以看上文

  这个例子的应用在`todomvc`中有详细的应用，通过数据状态来修改css

#### 2.绑定style

```html
<div v-bind:style="styleObject"></div>
```

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

