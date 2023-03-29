const User= require('../../../models/user');
const Post= require('../../../models/posts');
module.exports.index = async function(req,res){

    if(!req.isAuthenticated)return res.redirect('back');

    

    Post.find({}).populate('user').exec(function(err,bloggs){
        if(err)alert('errror in finding bloggs');
        else{return res.json(200, {
            message : "List of posts",
            posts: bloggs
        });}
    });    

}

module.exports.destroy = async function(req,res) {  
    try{
        let post =await Post.findById(req.params.id);
        if(post.user ==req.user.id){
        post.remove();
        return res.json(200,{message:'post has been deleted successfully'});
        }else{
            return res.json(401,{
                message: "You cannot delete this post!"
            });
        }
    }
    catch(err){console.log('**********',err);
        return res.json(500, {message: 'internal server error'});
    }  
    
    }