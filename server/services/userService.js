const User = require('../models/User')

async function getAll() {
    return await User.find({}).lean();
}

async function create(data) {
    let user = new User(data);

    return await user.save().then(result => {
        console.log('Created new user!!')
        return result;
    })
}

async function getUser(_id) {
    
    return await User.findById(_id).lean()
}

async function getUserByUid(uid) {
    return await User.findOne({ uid: uid }).lean()
}

module.exports = {
    getAll,
    create,
    getUser,
    getUserByUid
}