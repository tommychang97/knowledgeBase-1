
window.onload = function () {
    document.getElementById("showreplies").onclick = function () {
        console.log(this.parentElement.parentElement.parentElement);
        const divPost = this.parentElement.parentElement.parentElement;
        const divRepliesToPost = divPost.childNodes[5];
        const divReplyBox = divPost.childNodes[7];
        console.log(divRepliesToPost.childNodes.length);
        const numReplies = divRepliesToPost.childNodes.length;
        if (numReplies < 1) {
            // Bhupinder said he would like the page not to refresh and the box to show
            // todo: Do a loop here to append all replies
            let divReply = document.createElement("div");
            divReply.classList.add("div_reply");
            let divUserImg = document.createElement("div");
            divUserImg.classList.add("reply_img");
            let userImg = document.createElement("img");
            // placeholder
            userImg.src = "https://randomuser.me/api/portraits/women/48.jpg";
            userImg.alt = "";
            divUserImg.appendChild(userImg);

            let divReplyBody = document.createElement("div");
            divReplyBody.classList.add("reply_body");
            let divReplyText = document.createElement("div");
            divReplyText.classList.add("reply_text");
            let replytext = document.createTextNode("*Insert exact problem that you have.* EDIT: Nevermind, I solved it! Closed.");

            divReplyText.appendChild(replytext);
            divReplyBody.appendChild(divReplyText);

            divReply.appendChild(divUserImg);
            divReply.appendChild(divReplyBody);

            divRepliesToPost.appendChild(divReply);

            // end loop
            // Then append the reply box and button

            const replyBox = document.createElement("textarea");
            replyBox.classList.add("reply_box");
            replyBox.cols = "30";
            replyBox.rows = "10";
            replyBox.placeholder = "add your reply ....";

            const commentButton = document.createElement("button");
            commentButton.classList.add("comment_button");
            const commentButtonText = document.createTextNode("comment");
            commentButton.appendChild(commentButtonText);

            // todo: do post (?) call to submit the reply

            commentButton.onclick = function () {
                console.log(replyBox.value);
                let divReply2 = document.createElement("div");
                divReply2.classList.add("div_reply");
                let divUserImg2 = document.createElement("div");
                divUserImg2.classList.add("reply_img");
                let userImg2 = document.createElement("img");

                // todo: Get the user image of the correct user here

                userImg2.src = "https://randomuser.me/api/portraits/men/22.jpg";
                userImg2.alt = "";
                divUserImg2.appendChild(userImg2);

                let divReplyBody2 = document.createElement("div");
                divReplyBody2.classList.add("reply_body");
                let divReplyText2 = document.createElement("div");
                divReplyText2.classList.add("reply_text");
                let replytext2 = document.createTextNode(replyBox.value);
                replyBox.value = "";

                divReplyText2.appendChild(replytext2);
                divReplyBody2.appendChild(divReplyText2);

                divReply2.appendChild(divUserImg2);
                divReply2.appendChild(divReplyBody2);

                divRepliesToPost.appendChild(divReply2);
            }

            divReplyBox.appendChild(replyBox);
            divReplyBox.appendChild(commentButton);
        }
        else {
            let child = divRepliesToPost.lastElementChild;
            while (child) {
                divRepliesToPost.removeChild(child);
                child = divRepliesToPost.lastElementChild;
            }
            child = divReplyBox.lastElementChild;
            while (child) {
                divReplyBox.removeChild(child);
                child = divReplyBox.lastElementChild;
            }
        }
    }
};