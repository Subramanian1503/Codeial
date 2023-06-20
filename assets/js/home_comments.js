{
  let createComment = () => {
    // Getting the DOM element of the newly created comment form
    let createCommentForm = $("#new-comment-form");

    // Defining the event that will trigger while creating new comment
    createCommentForm.submit((event) => {
      console.log("Submit event triggered successfully");

      // Preventing the default event behavior
      event.preventDefault();
      console.log("prevented the event default behavior");

      // Define ajax to trigger the create comment API call
      $.ajax({
        type: "post",
        url: "comment/create",
        data: createCommentForm.serialize(),
        success: (data) => {
          // Convert the API response as DOM object
          const commentResponse = data.data.comment;
          let createdCommentDOM = getCreatedCommentDOM(commentResponse);

          // Prepond the DOM object to the list of comments
          $(`#post-${commentResponse.post} #comment-list-container ul`).prepend(
            createdCommentDOM
          );

          // Provide behavior of deleting the comment to the newly created post
          deleteComment($(" .delete-comment-button", createdCommentDOM));
        },
        error: (error) => {
          console.log(`Error while trying to create comment: ${error}`);
        },
      });
    });
  };

  // Method to construct the DOM of created comment
  let getCreatedCommentDOM = (comment) => {
    console.log(`${comment}`);
    return $(`
    <li id="comment-${comment._id}">
    
    <small>
    
    <a class="delete-comment-button" href="comment/delete/${comment._id}">Delete Comment</a></small>
    
    ${comment.content}
    
    <br>
    
    <small> <b>Author: </b> ${comment.user.name}</small>
    </li>
    `);
  };

  // Method to add java script functionality to delete comment for created comment
  let deleteComment = (deleteCommentAnchor) => {
    
    // Defining the on click functionality to delete the comment
    $(deleteCommentAnchor).click((event) => {
      
      // Preventing the default behavior of the on click event
      event.preventDefault();
      console.log("Click event triggered");

      // Defining the AJAX way of making API call to delete the comment
      $.ajax({
        type: "get",
        url: $(deleteCommentAnchor).prop("href"),
        success: (data) => {
    
          // Extracting the required informaton from response
          const deletedCommentId = data.data.comment_id;
          console.log(`${deletedCommentId}`);

          // Removing the Deleted comment DOM from current DOM object
          $(`#comment-${deletedCommentId}`).remove();
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  createComment();
}
