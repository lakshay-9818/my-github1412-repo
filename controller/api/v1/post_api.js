const User= require('../../../models/user');

module.exports.index = async function(req,res){
    if(!req.isAuthenticated)return res.redirect('back');

    //let user = await User.findOne()

    return res.json(200, {
        message : "List of posts",
        //userdetails : 
    });
}