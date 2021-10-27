const User = require('../models/User')

async function getAll() {
    return await User.find({}).lean();
}

async function create(data) {
    let user = new User(data);

    return await user.save().then(result => {
        console.log('an user saved!!')
    })
}

async function updateLoginTries(userId) {
    let loginCount = await User.findOne({ uid: userId }).then(result => {
        return result.login_tries;
    });
    return await User.findOneAndUpdate({ uid: userId }, { login_tries: loginCount + 1 }).then(
        result => {
            console.log('loginTries updated!')
        }
    )
}

async function resetLoginTries(userId) {
    return await User.findOneAndUpdate({uid : userId}, {login_tries: 0}).then (result => {
        console.log("Reset login Tries")
    })
}

async function getUser (_id) {
    console.log(_id)
    return await User.findById(_id).lean()
}

module.exports = {
    getAll,
    create,
    updateLoginTries,
    resetLoginTries,
    getUser
}