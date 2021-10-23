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
    await User.findOneAndUpdate({ uid: userId }, { $set: { login_tries: loginCount + 1 } }).then(
        result => {
            console.log('loginTries updated!')
        }
    )
}

module.exports = {
    getAll,
    create,
    updateLoginTries,
}