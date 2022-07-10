// 云函数入口文件
// 更新 paired
// 问题：没有使用事务
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const pairCode = event.pairCode;
    const wxContext = cloud.getWXContext();
    const {OPENID:openid} = cloud.getWXContext();
    const db = cloud.database();
    let res = await db.collection('UserList').where({
        pairCode: pairCode,
        paired: false
    }).get();
    if (res.data.length === 0) {
        return {
            status: 'fail',
            reason: 'peer pairCode not exist'
        }
    }
    const peerOpenid = res.data[0]._openid;

    // 更新记录
    res = await db.collection('UserList').where({
        _openid: openid
    }).update({
        data: {
            paired: peerOpenid
        }
    })

    if (res.updated === 0) {
        return {
            status: 'fail',
            reason: 'update self failed'
        }
    }
    res = await db.collection('UserList').where({
        _openid: peerOpenid
    }).update({
        data: {
            paired: openid
        }
    })

    if (res.updated === 0) {
        return {
            status: 'fail',
            reason: 'update peer failed'
        }
    } else{
        return {
            status: 'ok'
        }
    }
}