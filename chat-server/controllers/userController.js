const User = require('../models/user');
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