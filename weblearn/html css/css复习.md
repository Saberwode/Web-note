## 作为css的复习手册

#### 1.选择器

css选择器分为五类：

- 简单选择器
  - 元素选择器 比如`<p>`对标签进行选择
  - id选择器 `#`
  - 类选择器 `.`
  - 通用选择器 `*`
  - 分组选择器 `a, p, span`

- 组合器选择器
  - 后代选择器 `a p span`
  - 子选择器 `div > p`这个选择器只会选中子代的p元素，不包含孙子元素等等，只是最近一层的
  - 相邻兄弟选择器 `div + p` （div跟p在同一个父元素中，这个选择器会选择紧跟着div的p元素）
  - 通用兄弟选择器 `div ~ p` 选择跟div同级的所有兄弟p元素

- 伪类选择器
  - 锚伪类 `a:hover, :visited, :active, :link`
  - 伪类 `div:hover, :focus, :checked, :disabled, :enabled`
  - css伪类
    - `:first-child` 第一个子元素
    - `:first-of-type`
    - `:last-child`
    - `:nth-child(n)`选择作为其父第n个元素（选同级）

- 伪元素选择器
  - `::after` 在元素之后插入
  - `::before`在元素之前插入
- 属性选择器 （css[attribute] 选择带有指定属性的元素）
  - `a[target]` 选择带有`target`属性的`a`元素
  - `a[target="_blank"]` 选择`target`属性值为`_blank`的元素
  - `[title ~="flower"]` 选择`title`属性值 