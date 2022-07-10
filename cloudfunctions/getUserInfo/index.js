// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;
    let paired = false;
    let pairCode = Math.random().toString(36).substring(2,8);
    let credit = 0;
    res = await db.collection('UserList').where({
        _openid: openid
    }).get()
    if (res.data.length === 0) {
        const res = await db.collection('UserList').add({
            data: {
                createdDate: new Date(),
                _openid: wxContext.OPENID,
                credit: credit,
                paired: paired,
                pairCode: pairCode
            }
        })
    }
    return {
        pairCode: res.data[0].pairCode,
        paired: res.data[0].paired,
        credit: credit,
        openid: wxContext.OPENID
    };

}