## Tic Tac Toe小游戏



### 目前实现的功能：

- 初始化3×3的子组件网格
- 绑定网格id
- 点击网格，向父组件传递id值
- 父组件接收到id，会对其进行计数，初始为0接受到一次id，计数加一（第一次接受id，count =1）
- 判断逻辑，如果count为奇数，且clickstate为1，修改其`player`值为`1`为偶数就修改为`2`,`clicktate`值置0
- 判断逻辑，如果点击过该网格（clickstate == 0），此次点击次数作废，player数值不变

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
            <div class="box1" v-for="item in total_stats1" @click="sendId(item)">{{item.player}}</div>
        </div>
    </template>
    <template id="block2">
        <div class="body">
            <div class="box2" v-for="item in total_stats2" @click="sendId(item)">{{item.player}}</div>
        </div>
    </template>
    <template id="block3">
        <div class="body">
            <div class="box3" v-for="item in total_stats3" @click="sendId(item)">{{item.player}}</div>
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

                    ],
                    clickCount: 0,
                }
            },
            methods: {
                changeState(item) {
                    console.log(item.id);
                },
                sendId(item) {
                    this.$emit("listen-child-id", item.id, item);

                }
            },
            props: ['cplayer'],
        }
        const block2 = {
            template: '#block2',
            data() {
                return {
                    total_stats2: [

                        { id: '4', click_state: '5', player: '' },
                        { id: '5', click_state: '6', player: '' },
                        { id: '6', click_state: '7', player: '' },

                    ],
                    clickCount: 0,
                }
            },
            methods: {
                changeState(item) {
                    console.log(item.id);
                },
                sendId(item) {
                    // 把div换成按钮，点击按钮之后，disabled属性给他设置成禁用就可以了
                    this.$emit("listen-child-id", item.id, item);

                }
            },
            props: ['cplayer'],
        }
        const block3 = {
            template: '#block3',
            data() {
                return {
                    total_stats3: [
                        { id: '7', click_state: '8', player: '' },
                        { id: '8', click_state: '9', player: '' },
                        { id: '9', click_state: '10', player: '' },
                    ],
                    clickCount: 0,
                }
            },
            methods: {
                changeState(item) {
                    console.log(item.id);
                },
                sendId(item) {
                    this.$emit("listen-child-id", item.id, item);
                }
            },
            props: ['cplayer'],
        }
        const app = new Vue({
            el: '#app',
            data: {
                // 记录点击次数，奇数为玩家一，偶数为玩家二
                clickCount: 0,
                // 记录子组件的状态
                childstats: [
                    { id: '1', click_state: '1', player: '1' },
                    { id: '2', click_state: '1', player: '' },
                    { id: '3', click_state: '1', player: '' },
                    { id: '4', click_state: '1', player: '' },
                    { id: '5', click_state: '1', player: '' },
                    { id: '6', click_state: '1', player: '' },
                    { id: '7', click_state: '1', player: '' },
                    { id: '8', click_state: '1', player: '' },
                    { id: '9', click_state: '1', player: '' },
                ],
                newarr: [],
                newarr2: [],
                lines: [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                    [1, 4, 7],
                    [2, 5, 8],
                    [3, 6, 9],
                    [1, 5, 9],
                    [3, 5, 7],
                ],
                game_state: 1,
            },
            components: {
                block1,
                block2,
                block3,
            },
            methods: {
                // 存放id，用于判断玩家都走了哪几步
                storageId() {
                    // this.newarr = this.childstats.filter((item, index) => {
                    //     return item.player === "1";
                    // })
                    // console.log(this.newarr);
                    // this.newarr2 = this.childstats.filter((item, index) => {
                    //     return item.player === "2";
                    // })
                    for (let item of this.childstats) {
                        // console.log(item.id);
                        if (item.player === "1") {
                            this.newarr.splice(-1, 0, parseInt(item.id));

                        }
                        if (item.player === "2") {
                            this.newarr2.splice(-1, 0, parseInt(item.id));

                        }
                    }
                    // if (this.newarr instanceof Array) {
                    //     alert("这个是个数组")
                    // } else {
                    //     alert('这个是个对象')
                    // }
                    console.log(this.newarr);
                    console.log(this.newarr2);
                },
                // 检查一个数组中是否包含另一个数组
                checkId(arr1, arr2) {
                    if (arr2) {
                        for (var i = arr2.length - 1; i >= 0; i--) {
                            if (!arr1.includes(arr2[i])) {
                                return false;
                            }
                        }
                    }
                    return true;

                },
                findWinner() {
                    if (this.lines.length) {
                        for (let i = 0; i < this.lines.length; i++) {
                            if (this.checkId(this.newarr, this.lines[i])) {
                                alert('玩家1胜');
                                this.game_state = 0;
                            } else if (this.checkId(this.newarr2, this.lines[i])) {
                                alert('玩家2胜');
                                this.game_state = 0;
                            }
                        }
                    }
                },

                // 获取从子组件传过来的id
                getChildId(id, item1) {
                    console.log(item1);
                    if (this.game_state) {
                        console.log('这个是id');
                        console.log(id);
                        // console.log(typeof id);
                        this.clickCount++;
                        // console.log(this.clickCount);
                        // 奇数为玩家一，偶数为玩家二
                        for (let item of this.childstats) {
                            // console.log(item.player);
                            if (item.id == id) {
                                // console.log('查询成功');
                                // 如果查询到已经点击过了，此次点击次数作废
                                if (item.click_state == '0') {
                                    this.clickCount--;
                                }
                                // 奇数为玩家一
                                if (this.clickCount % 2 == 1 && item.click_state == '1') {
                                    item.player = '1';
                                    item1.player = 'O';
                                    // 将点击状态置0，表示已经点击过了
                                    item.click_state = '0';
                                    // console.log('赋值成功');
                                    // 偶数为玩家二
                                } else if (this.clickCount % 2 == 0 && item.click_state == '1') {
                                    item.player = '2';
                                    item.click_state = '0';
                                    item1.player = 'X';
                                }

                            }
                        }
                        // for (let item of this.childstats) {
                        //     console.log(item.player);
                        // }
                        this.storageId();
                        // if (this.checkId(this.newarr, this.arr1)) {
                        //     alert('1');
                        // }
                        this.findWinner()
                    }
                },


            }
        })
    </script>
</body>

</html>
```

