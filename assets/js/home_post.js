
import Post from '../../models/posts';
{   
    //method to submit data for new post using ajax
    console.log('script loaded');
   let createPost = ()=> {
    let newPostForm = $('#new-post');
    newPostForm.submit(function(e){
        e.preventDefault();
        console.log('script loaded2');
        $.ajax({
            type: 'post',
            url: '/blogs/write',
            data: newPostForm.serialize(),
             success:function(data){
                console.log(data);
            let newPost = newPostDom(data.data.post);
           $('#post-list').prepend(newPost);
         },
            error:(error)=> console.log(error.responseText) 
        });
    });
   } 
   //method to create new post
   let newPostDom = (post)=>{
    let posT = Post.findById(post._id).populate('user');
    return $(`
    <li id="post-${post._id}"> ${post.content}

      
                    <br> ${posT.user } 
                </li>
    `);
   }
   
   createPost();
}