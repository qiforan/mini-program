// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const db = cloud.database();
    const pairCode = event.pairCode;
    const _ = db.command;
    const data = await db.collection('UserList').where(_.and([
        {
            pairCode: pairCode
        },
        {
            paired: false
        }
    ])).get();

    return data;
}