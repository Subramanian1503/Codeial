{
  let createPost = () => {
    // Getting the form from views
    let new_post_form = $("#new-post-form");

    // Define the behaviour for submit button
    new_post_form.submit((event) => {
      // Prevent the default behavior
      event.preventDefault();

      // Call the posts/create URL to create a post using AJAX
      $.ajax({
        type: "post",
        url: "posts/create",
        data: new_post_form.serialize(),
        success: (data) => {
          // Creating the DOM of newly created post
          let createPostDOM = listCreatedPosts(data.data.post);

          // Appending it to the current post list
          $("#posts-list-container>ul").prepend(createPostDOM);

          // Add delete button on click DOM to the created post
          deletePost(" .delete-post-button", createPostDOM);

          // Showing the notification
          showSuccessNoty("Post created successfully");
        },
        error: (error) => {
          console.log(`Error occurred while trying to creat post: ${error}`);

          // Showing the notification
          showErrorNoty(error.responseText);
        },
      });
    });
  };

  let listCreatedPosts = (post) => {
    // Create the DOM of listing the posts
    // Change it to Ajax syntax
    return $(`
        <li id = "post-${post._id}">
            
            <small><a class="delete-post-button" href="posts/delete/${post._id}">X</a></small>
            
            ${post.content}
            
            <br>
            
            <small><b>Author: </b> ${post.user.name} </small>

          <small>
           <a class="toggle-like-button" data-likes="0" href="/like/toggle?id=<%= post._id %>&type=Post">0 Likes
           </a>
         </small>
            
            <!-- Adding comments for the post -->
            <div id="create-comment-container">
            
                <form action="comment/create" method="POST">
                    <input type="text" name="content" placeholder="Add comments.." />
                    <input type="hidden" name="post" value=${post._id} />
                    <input type="submit" value="Add comment" />
                </form>
            
            </div>

            <!-- list all comments of this post -->
            <div id="comment-list-container">
            
            <!-- Listing all the containers -->
            
                <ul id = "post-comments-${post._id}">
                
                </ul>
            
            </div>
            
            <br>
        
        </li>
  `);
  };

  // method to delete the requested post from DOM
  let deletePost = (deletePostLink) => {
    // Setting the behavior for on click event of the link
    $(deletePostLink).click((event) => {
      // Prevent the default behavior of that event
      event.preventDefault();

      // Trigger the url to delete the post from DB
      $.ajax({
        type: "get",
        url: $(deletePostLink).prop("href"),
        success: (data) => {
          // Remove the requested post DOM from the existing list of posts DOM
          $(`#post-${data.data.post_id}`).remove();

          // Showing the notification
          showSuccessNoty("Post removed successfully");
        },
        error: (error) => {
          console.log(error.responseText);
          showErrorNoty(error.responseText);
        },
      });
    });
  };

  //Method to show success noty message
  let showSuccessNoty = (message) => {
    if (message && message.length > 0) {
      new Noty({
        theme: "relax",
        text: message,
        type: "success",
        layout: "topRight",
        timeout: 1500,
      }).show();
    }
  };

  //Method to show error noty message
  let showErrorNoty = (message) => {
    if (message && message.length > 0) {
      new Noty({
        theme: "relax",
        text: message,
        type: "error",
        layout: "topRight",
        timeout: 1500,
      }).show();
    }
  };

  createPost();
}
