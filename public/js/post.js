console.log('SCRIPT POST');

let toggleRepliesContainerDisplay = (id) => {
    console.log(id);
    const replyContainer = document.getElementById(`replies_container_${id}`);
    if (replyContainer.style.display === 'block') {
        replyContainer.style.display = 'none';
    } else {
        replyContainer.style.display = 'block';
    }
};
