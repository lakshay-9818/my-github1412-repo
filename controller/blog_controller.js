 const Post =require('../models/posts');
 

 module.exports.blogVew= function(req,res){

    Post.find({}).populate('user').exec(function(err,bloggs){
        if(err)alert('errror in finding bloggs');
        if(req.isAuthenticated())  {
           
            return res.render('blog' ,{titl:`Blogs`, bloGs: bloggs ,logged_In: true }   );
     
          }

    else  {
           return res.render('blog',{titl:`Blogs`, bloGs: bloggs , logged_In: false } );}
    });
    
    
}

 module.exports.write =async function(req,res){
    //console.log(req.user);
    let post=  await Post.create({
        content: req.body.content,
    user:req.user._id
    });
    
    if (req.xhr){ console.log('requested using ajax call');
        return res.status(200).json({  
            data:{
                post: post
            },message: "post created!"
        })
    }

        return res.redirect('back');
    
 }

 module.exports.deleteP = async function(req,res){    
   let post =await Post.findById(req.query.id);
   if(post.user._id== req.user.id){
    post.remove();
    console.log('deleted successfully');    
              req.flash('success','post deleted successfully');
   }
   else {req.flash('error','not authorized to dlt this post');}
       
        return res.redirect('back');
   }