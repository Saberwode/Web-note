#### 3.grid布局：

- 划分行列

grid-template-columns：列宽

grid-template-rows	：行高

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

其中几个参数就是几行几列

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}
```

repeat重复几次

```css
grid-template-columns: repeat(2, 100px 20px 80px);
```

将`100px 20px 80px`重复两次

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

有时单元格大小是固定的，容器大小可以不规定，所以此时使用`auto-fill`自动填充，每列宽度为100px。

```css
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```

第三列是第二列的两倍

```css
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```

网格线可定义名称，也可以定义多个名称

- 行列间距

grid-row-gap：行间距

grid-column-gap ：列间距

```css
.container {
  gap: 20px 20px;
}
```

设置行列间距的简写，如果忽略第二个值，那默认两值相等

