// client에서 io를 연결시키고 이벤트를 항상 듣고 있어야 함.
// 서버에서 emit / broadcast 이벤트를 방출했을 때 듣고 반응함.
// client, server 모두 이벤트를 듣고 발생시킬 수 있음.
// eslint-disable-next-line no-undef
const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`You: ${message}`);
}

function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
}

function handleMessageNotif(data) {
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`);
}

socket.on("messageNotif", handleMessageNotif);
