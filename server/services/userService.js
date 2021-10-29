const User = require('../models/User')

async function getAll() {
    return await User.find({}).lean();
}

async function create(data) {
    let user = new User(data);

    return await user.save().then(result => {
        console.log(result)
        console.log('an user saved!!')
        return 'true'
    })
}

async function getUser(_id) {
    console.log(_id)
    return await User.findById(_id).lean()
}

async function getUserByUid(uid) {
    console.log(uid)
    return await User.findOne({ uid: uid }).lean()
}

module.exports = {
    getAll,
    create,
    getUser,
    getUserByUid
}