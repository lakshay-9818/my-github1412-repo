import User from "../../../models/user.js";
import Post from "../../../models/posts.js";
 async function index(req,res){

    if(!req.isAuthenticated)return res.redirect('back');

    

    Post.find({}).populate('user').exec(function(err,bloggs){
        if(err)alert('errror in finding bloggs');
        else{return res.json(200, {
            message : "List of posts",
            posts: bloggs
        });}
    });    

}

async function destroy(req,res) {  
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

export {index, destroy};