window.onload = function () {
    const write_message = document.getElementById('write_message');
    write_message.onkeyup = canSend;
    const messageBoxButton = document.getElementById('message_box_button');
    messageBoxButton.style.cursor = 'not-allowed';
    messageBoxButton.disabled = true;
    messageBoxButton.style.backgroundColor = '#3c7fc28c';

    messageBoxButton.onclick = function () {
        console.log('test');
    };

    function canSend() {
        if (document.getElementById('write_message').value === '') {
            messageBoxButton.disabled = true;
            messageBoxButton.style.backgroundColor = '#3c7fc28c';
            messageBoxButton.style.cursor = 'not-allowed';
        } else {
            messageBoxButton.disabled = false;
            messageBoxButton.style.backgroundColor = '#00A2E8';
            messageBoxButton.style.cursor = 'pointer';
        }
    }
};
