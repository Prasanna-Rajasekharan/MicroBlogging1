let currentUserUsername = null;
let users = [];
let posts = [];

// Simulate user registration
function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please fill in both fields!");
        return;
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert("Username already exists.");
        return;
    }

    const newUser = {
        username,
        password,
        following: [],
    };

    users.push(newUser);
    currentUserUsername = username;

    document.getElementById("registration").style.display = "none";
    document.getElementById("feed").style.display = "block";
    loadFeed();
}

// Simulate post creation
function createPost() {
    const content = document.getElementById("postContent").value;
    const imageUpload = document.getElementById("imageUpload").files[0];

    if (!content) {
        alert("Please enter some content before posting!");
        return;
    }

    const newPost = {
        id: `post_${Date.now()}`,
        content,
        authorUsername: currentUserUsername,
        imageUrl: imageUpload ? URL.createObjectURL(imageUpload) : null,
        reactions: {
            thumbsUp: 0,
            heart: 0,
            laugh: 0,
        },
        comments: [],
    };

    posts.push(newPost);
    document.getElementById("postContent").value = ""; // Clear the textarea
    loadFeed();
}

// Simulate loading the feed
function loadFeed() {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = ""; // Clear existing posts

    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `
            <strong>${post.authorUsername}:</strong> ${post.content}
            ${
                post.imageUrl
                    ? `<img src="${post.imageUrl}" class="post-image" onclick="openModal('${post.imageUrl}')"/>`
                    : ""
            }
            <div class="reactions">
                <button onclick="reactToPost('${post.id}', 'thumbsUp')">👍 (${post.reactions.thumbsUp})</button>
                <button onclick="reactToPost('${post.id}', 'heart')">❤️ (${post.reactions.heart})</button>
                <button onclick="reactToPost('${post.id}', 'laugh')">😂 (${post.reactions.laugh})</button>
            </div>
            <div class="comments">
                <h4>Comments</h4>
                <div class="comments-list">
                    ${post.comments.map(comment => `<p><strong>${comment.username}:</strong> ${comment.text}</p>`).join("")}
                </div>
                <input type="text" placeholder="Add a comment..." id="comment_${post.id}" />
                <button onclick="addComment('${post.id}')">Comment</button>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

// Simulate reactions to a post
function reactToPost(postId, reactionType) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.reactions[reactionType]++;
        loadFeed(); // Refresh feed to update reactions
    }
}

// Simulate adding a comment
function addComment(postId) {
    const commentInput = document.getElementById(`comment_${postId}`);
    const commentText = commentInput.value;

    if (!commentText) {
        alert("Please enter a comment!");
        return;
    }

    const post = posts.find(p => p.id === postId);
    if (post) {
        const newComment = {
            id: `comment_${Date.now()}`,
            text: commentText,
            username: currentUserUsername,
        };

        post.comments.push(newComment);
        commentInput.value = ""; // Clear the comment input
        loadFeed(); // Refresh feed to update comments
    }
}

// Open image in modal
function openModal(imageUrl) {
    const modal = document.getElementById("imageModal");
    const fullImage = document.getElementById("fullImage");
    fullImage.src = imageUrl;
    modal.style.display = "block";
}

// Close the modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Simulate following a user
function followUser() {
    const followUsername = document.getElementById("followUsername").value;
    const user = users.find(user => user.username === currentUserUsername);

    if (user && followUsername && followUsername !== currentUserUsername) {
        const followedUser = users.find(user => user.username === followUsername);
        if (followedUser && !user.following.includes(followUsername)) {
            user.following.push(followUsername);
            alert(`You followed ${followUsername}`);
        } else {
            alert("User not found or already following.");
        }
    }
}

// Simulate unfollowing a user
function unfollowUser() {
    const unfollowUsername = document.getElementById("followUsername").value;
    const user = users.find(user => user.username === currentUserUsername);

    if (user && unfollowUsername) {
        user.following = user.following.filter(username => username !== unfollowUsername);
        alert(`You unfollowed ${unfollowUsername}`);
    }
}
