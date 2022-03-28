let socket = io();
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');

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
        user,
        message: chatBox.value.trim(),
      });
      chatBox.value = '';
    }
  }
});
/* Eventos de sockets*/

socket.on('log', (data) => {
  let messages = '';
  data.forEach((log) => {
    messages = messages + `${log.user}dice: ${log.message}<br>`;
  });
  log.innerHTML = messages;
});
