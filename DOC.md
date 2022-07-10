# 小程序开发笔记

## 一、云函数调用
1. 小程序端
```js
const res = await wx.cloud.callFunction({
  // 云函数名称
  name: 'add',
  // 传给云函数的参数
  data: {
    a: 1,
    b: 2,
  },
})
// 返回结果存于 result 域
console.log(res.result)
```

2. 云端

`event` 就是小程序端调用云函数时传入的参数，外加后端自动注入的小程序用户的 `openid` 和小程序的 `appid`。

`context`` 对象包含了此处调用的调用信息和运行状态，可以用它来了解服务运行的情况。

使用 `wx-server-sdk` 提供的 `getWXContext` 方法获取到每次调用的上下文（`appid`、`openid` 等），无需维护复杂的鉴权机制，即可获取天然可信任的用户登录态（`openid`）。

```js
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext();
  return {
    // 调用参数存于 event 
    sum: event.a + event.b
  }
}
```

## 二、云开发数据库

1. 插入数据

```js
const res = await db.collection('todos').add({
  // data 字段表示需新增的 JSON 数据
  data: {
    description: "learn cloud database",
    due: new Date("2018-09-01"),
    tags: [
      "cloud",
      "database"
    ],
    location: new db.Geo.Point(113, 23),
    done: false
  }
})
// res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
console.log(res)
```

2. 查询数据

```js
// 1. 使用 `doc` ，参数为 `_id`
const res = await db.collection('todos').doc('todo-identifiant-aleatoire').get();

// 2. 条件查询, where 方法接收一个对象参数
// 该对象中每个字段和它的值构成一个需满足的匹配条件
// 各个字段间的关系是 "与" 的关系
const res = await db.collection('todos').where({
  _openid: 'user-open-id',
  done: false
})

// 3. 更复杂的查询，使用 db.command，略

// 查询结果存于 res.data
console.log(res.data)
```

3. 更新数据

```js
const res = await db.collection('todos').doc('_id').update({
  // data 传入需要局部更新的数据
  data: {
    // 表示将 done 字段置为 true
    done: true
  }
})

// 替换更新
// 如果指定 ID 的记录不存在，则会自动创建该记录，该记录将拥有指定的 ID。
const _ = db.command
db.collection('todos').doc('todo-identifiant-aleatoire').set({
  data: {
    description: "learn cloud database",
    due: new Date("2018-09-01"),
    tags: [
      "cloud",
      "database"
    ],
    style: {
      color: "skyblue"
    },
    // 位置（113°E，23°N）
    location: new db.Geo.Point(113, 23),
    done: false
  },
  success: function(res) {
    console.log(res.data)
  }
})

console.log(res.data)
```
