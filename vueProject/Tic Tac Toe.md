## Tic Tac Toe小游戏



### 目前实现的功能：

- 初始化3×3的子组件网格
- 绑定网格id
- 点击网格，向父组件传递id值
- 父组件接收到id，会对其进行计数，初始为0接受到一次id，计数加一（第一次接受id，count =1）
- 判断逻辑，如果count为奇数，对子组件进行写回，修改其`player`值为`0`为偶数就修改为`1`（待实现）

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box1,
        .box2,
        .box3 {
            background: #fff;
            margin: 0 auto;
            width: 100px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            float: left;
            border-left: 1px solid black;
            border-bottom: 1px solid black;
        }

        .body {
            width: 303px;
            height: 100px;
            margin: 0 auto;
            display: block;
            border-right: 1px solid black;
            border-top: 1px solid black;

        }
    </style>
</head>

<body>
    <div id="app">
        <block1 @listen-child-id='getChildId'></block1>
        <block2 @listen-child-id='getChildId'></block2>
        <block3 @listen-child-id='getChildId'></block3>

    </div>
    <template id="block1">
        <div class="body">
            <div class="box1" v-for="item in total_stats1" @click="sendId(item)">{{item.id}}</div>
        </div>
    </template>
    <template id="block2">
        <div class="body">
            <div class="box2" v-for="item in total_stats2" @click="sendId(item)">{{item.id}}</div>
        </div>
    </template>
    <template id="block3">
        <div class="body">
            <div class="box3" v-for="item in total_stats3" @click="sendId(item)">{{item.id}}</div>
        </div>
    </template>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const block1 = {
            template: '#block1',
            data() {
                return {
                    total_stats1: [
                        { id: '1', click_state: '2', player: '' },
                        { id: '2', click_state: '3', player: '' },
                        { id: '3', click_state: '4', player: '' },

                    ]
                }
            },
            methods: {
                changeState(item) {
                    console.log(item.id);
                },
                sendId(item) {
                    this.$emit("listen-child-id", item.id);
                }
            }
        }
        const block2 = {
            template: '#block2',
            data() {
                return {
                    total_stats2: [

                        { id: '4', click_state: '5', player: '' },
                        { id: '5', click_state: '6', player: '' },
                        { id: '6', click_state: '7', player: '' },

                    ]
                }
            },
            methods: {
                changeState(item) {
                    console.log(item.id);
                },
                sendId(item) {
                    this.$emit("listen-child-id", item.id);
                }
            }
        }
        const block3 = {
            template: '#block3',
            data() {
                return {
                    total_stats3: [
                        { id: '7', click_state: '8', player: '' },
                        { id: '8', click_state: '9', player: '' },
                        { id: '9', click_state: '10', player: '' },
                    ]
                }
            },
            methods: {
                changeState(item) {
                    console.log(item.id);
                },
                sendId(item) {
                    this.$emit("listen-child-id", item.id);
                }
            }
        }
        const app = new Vue({
            el: '#app',
            data: {
                // 记录点击次数，奇数为玩家一，偶数为玩家二
                clickCount: 0,
            },
            components: {
                block1,
                block2,
                block3,
            },
            methods: {
                // 获取从子组件传过来的id
                getChildId(id) {
                    console.log(id);
                    this.clickCount++;
                    // console.log(this.clickCount);
                }

            }
        })
    </script>
</body>

</html>
```

