let socket = io();
let chatBox = document.getElementById('chatBox');
let divChat = document.getElementById('chat');
let divChatAndInput = document.getElementById('chatAndInput');
// let log = document.getElementById('log');

let user;

/* ALERT DE IDENTIFICACION*/
Swal.fire({
  title: 'Identificate',
  input: 'text',
  allowOutsideClick: false,
  inputValidator: (value) => {
    return !value && '¡Debes ingresar tu nombre de usuario para participar!';
  },
}).then((result) => {
  user = result.value;
});
/* FIN DE ALERT DE IDENTIFICACION*/

chatBox.addEventListener('keyup', (evt) => {
  if (evt.key === 'Enter') {
    if (chatBox.value.trim().length > 0) {
      // por lo menos se envia un simbolo
      socket.emit('sendMessage', {
        user: user,
        message: chatBox.value.trim(),
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      });
      chatBox.value = '';
    }
  }
});
/* Eventos de sockets*/

socket.on('log', (data) => {
  let messages = '';
  data.forEach((log) => {
    if (user === log.user) {
      messages += `<div id="myMessages" class="myMessages">
                      <p id="log" class="pMessage"> ${log.user}: ${log.message}  <small>${log.time}</small> </p>
                  </div>`;
    } else {
      messages += `
                  <div id="messages" class="messages" >
                  <p id="log" class="pMessage"> ${log.user}: ${log.message}  <small>${log.time}</small> </p>
                  </div>`;
    }
  });
  divChat.innerHTML = messages;
});
