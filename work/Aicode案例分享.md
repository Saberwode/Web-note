### 一、转化对象数组的格式

#### 1. 需求：有一个对象数组，需要将该数组转化为后端需要的格式

数组：

```js
[
    {
      enrollTaskId: 1105,
      label: '对象1'
    },
    {
      id: 3,
      parentId: 1105,
      label: '对象2'
    },
    {
      id: 4,
      parentId: 1105,
      label: '对象3'
    },
    {
      id: 66,
      parentId: 1200,
      label: '对象4'
    }
  ]
```

转化后的数组：

```js
[
    {
      enrollTaskId: 1105,
      channelIds: [3, 4]
    },
    {
      enrollTaskId: 1200,
      channelIds: [66]
    }
  ];
```

#### 2. 分析需求：该数组的转化目标为，将parentId相同的对象的`id`提取出来，存放在channelIds的数组中，其中`enrollTaskId`可能存在，也可能不存在。其中parentId与enrollTaskId时多对一的关系

#### 3. 解决过程：

将目标数组与转化后的数组输入进去，接着输入指令，将目标数组转化为当前数组，其中，parentId与enrollTaskId是多对一的关系，如果存在parentId没有对应的enrollTaskId，则创建一个enrollTaskId与其对应

#### 4. 生成的结果如下：

```js
function transformArray(arr) {
  const resultMap = new Map();
  for (const obj of arr) {
    let parentId = obj.parentId;
    while (parentId && !resultMap.has(parentId)) {
      const parentObj = arr.find((o) => o.enrollTaskId === parentId);
      parentId = parentObj?.parentId;
      if (parentObj) {
        resultMap.set(parentObj.enrollTaskId, {
          enrollTaskId: parentObj.enrollTaskId,
          channelIds: [],
        });
      }
    }
    const key = parentId || obj.enrollTaskId;
    const resultObj = resultMap.get(key);
    if (resultObj) {
      resultObj.channelIds.push(obj.id);
    } else {
      resultMap.set(key, {
        enrollTaskId: key,
        channelIds: [obj.id],
      });
    }
  }
  return Array.from(resultMap.values());
}

```

使用示例：

```js
const arr = [
  {
    enrollTaskId: 1105,
    label: "对象1",
  },
  {
    id: 3,
    parentId: 1105,
    label: "对象2",
  },
  {
    id: 4,
    parentId: 1105,
    label: "对象3",
  },
  {
    id: 66,
    parentId: 1200,
    label: "对象4",
  },
];

const result = transformArray(arr);
console.log(result);

```

输出结果：

```js
[
  { enrollTaskId: 1105, channelIds: [3, 4] },
  { enrollTaskId: 1200, channelIds: [66] }
]

```

解析内容：

该方法首先创建了一个 Map 对象 `resultMap`，其中键是 `enrollTaskId` 或最高层级的 `parentId`，值是包含 `enrollTaskId` 和 `channelIds` 属性的对象。

然后遍历输入数组 `arr`，对于每个对象，首先找到其最高层级的 `parentId` 对应的 `enrollTaskId`，如果该 `enrollTaskId` 对应的对象不存在于 `resultMap` 中，则继续向上查找其父级，直到找到一个已存在于 `resultMap` 中的 `enrollTaskId` 对应的对象或到达最高层级。然后将当前对象的 `id` 添加到该 `enrollTaskId` 对应的对象的 `channelIds` 数组中。

如果找不到任何已存在的 `enrollTaskId` 对应的对象，则将该对象的 `enrollTaskId` 或最高层级的 `parentId` 作为键，创建一个新的对象，将该对象的 `channelIds` 属性初始化为包含当前对象的 `id` 的数组，并将其添加到 `resultMap` 中。

最后，返回 `resultMap` 中的所有值作为结果。

#### 5. 代码优化：

根据生成的代码，可以发现会存在enrollTaskId为undefined的情况

此时将该问题作为指令进行提问，得到优化后的代码：

```js
function transformData(data) {
  const result = data.reduce((acc, curr) => {
    if (curr.enrollTaskId) {
      acc.push({
        enrollTaskId: curr.enrollTaskId,
        channelIds: []
      });
    } else {
      const parentObj = acc.find(obj => obj.enrollTaskId === curr.parentId);
      if (parentObj) {
        parentObj.channelIds.push(curr.id);
      } else {
        acc.push({
          enrollTaskId: curr.enrollTaskId,
          channelIds: [curr.id]
        });
      }
    }
    return acc;
  }, []);
  return result;
}

```

使用示例：

```js
const data = [
  {
    enrollTaskId: 1105,
    label: "对象1"
  },
  {
    id: 3,
    parentId: 1105,
    label: "对象2"
  },
  {
    id: 4,
    parentId: 1105,
    label: "对象3"
  },
  {
    enrollTaskId: 1200,
    label: "对象4"
  },
  {
    id: 66,
    parentId: 1200,
    label: "对象5"
  }
];

const result = transformData(data);
console.log(result);

```

输出结果：

```js
[
  {
    enrollTaskId: 1105,
    channelIds: [3, 4]
  },
  {
    enrollTaskId: 1200,
    channelIds: [66]
  }
]

```

#### 6. 总结

至此，就可以通过aicode生成预期的处理函数代码



​																																	   文/考试与语言学习研发部 郭家鸣