const User = require('../models/user');
const FriendRequest = require('../models/friendRequest');
const filterObj = require('../utils/filterObject');

exports.update = async (req, res, next) => {
    const { user } = req;

    const filtersBody = filterObj(
        req.body,
        'firstName',
        'lastName',
        'about',
        'avatar'
    );

    const updateedUser = await User.findByIdAndUpdate(
        user._id,
        filtersBody,
        {
            new: true,
            validateModifiedOnly: true
        },
    );

    return res.status(200).json({
        status: 'error',
        data: updateedUser,
        message: 'updated successfully'
    });
};

exports.getUsers = async (req, res, next) => {
    const all_users = await User.find({
        verified: true,
    })
    .select("firstName, lastName, _id");

    const this_user = req.user;

    const remaining_user = all_users
        .filter(
            user => !this_user.friends.includes(user._id)
                    && user._id.toString() !== req.user._id.toString()
        );

    return res.status(200).json({
        message: 'success',
        message: "Users found successfully",
        data: remaining_user,
    });
};

exports.getRequests = async (req, res, next) => {
    const request = await FriendRequest
        .find({ recipient: req.user._id })
        .populate("sender", "_id firstName lastName");

    return res.status(200).json({
        status: 'success',
        data: request,
        message: "Friends request found successfully"
    });
};

exports.getFriends = async (req, res, next) => {
    const friends = await User
        .findById(req.user._id)
        .populate("friends", "_id firstName lastName");

    return res.status(200).json({
        status: 'success',
        data: friends,
        message: "Friends found successfully"
    });
};
