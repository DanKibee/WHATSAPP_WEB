let chatsData = [];
let jsonData;
const chatList = document.getElementById("chatlist");
fetch("chats.json")
  .then((response) => response.json())
  .then((data) => {
    jsonData = data;
    chatsData = data.chats;
    createChatList(chatsData);
  })
  .catch((error) => {
    console.error("Error loading chats:", error);
    createChatList([]);
  });
let createChatList = (chatsData) => {
  chatList.innerHTML = "";
  chatsData.forEach((chat) => {
    const chatItem = document.createElement("div");
    chatItem.id = "chat-item";
    //creating a profile picture
    const profilePic = document.createElement("img");
    profilePic.className = "profile-pic";
    profilePic.src = chat.profilePic || "defaultProfile.jpg";
    profilePic.alt = `${chat.name}'s profile`;
    //creating the profile's name and preview
    const chatInfo = document.createElement("div");
    chatInfo.className = "chat-info";
    const chatName = document.createElement("div");
    chatName.className = "chat_name";
    chatName.textContent = chat.name;

    const chatPreview = document.createElement("div");
    chatPreview.className = "chat-preview";
    chatPreview.textContent = chat.preview;
    //appending the chat name and preview to the chat info
    chatInfo.appendChild(chatName);
    chatInfo.appendChild(chatPreview);
    //creating the timestamp
    const chatTime = document.createElement("div");
    chatTime.className = "chat-time";
    chatTime.textContent = chat.timestamp;
    //creating the unread message indicator
    let unreadIndicator = "";
    if (chat.unread) {
      unreadIndicator = document.createElement("span");
      unreadIndicator.className = "unread";
      unreadIndicator.textContent = "1";
    }
    //creating the read message indicator
    let readIndicator = "";
    if (chat.read) {
      readIndicator = document.createElement("span");
      readIndicator.className = "read";
      readIndicator.textContent = ">>";
    }
    //appending the profile picture, chat info, timestamp and indicators to the chat item
    chatItem.appendChild(profilePic);
    chatItem.appendChild(chatInfo);
    chatItem.appendChild(chatTime);
    if (unreadIndicator) {
      chatItem.appendChild(unreadIndicator);
    }
    if (readIndicator) {
      chatItem.appendChild(readIndicator);
    }
    //appending the chat item to the chat list
    chatList.appendChild(chatItem);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  createChatList(chatsData);
});

let searchChats = () => {
  // getting the elements in the search input
  const searchInput = document.getElementsByClassName("input")[0];
  const listChat = document.getElementById("chatlist");
  if (!searchInput || !listChat) {
    console.error("Search input or chat list not found");
    return;
  }
  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();
    listChat.innerHTML = "";
    const filteredChats = chatsData.filter((chat) =>
      chat.name.toLowerCase().includes(searchValue)
    );
    createChatList(filteredChats);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // searchChats();
  // Function to handle chat item click
  const chatItems = document.getElementById("chatlist").getElementsByClassName("chatItem");
  console.log(chatItems);
  const items = Array.from(chatItems);
  console.log(items);
  for (let i of items) {
    // const item = items[i];
    console.log(i);

    // item.addEventListener("click", () => {
    //   console.log("Hello world");
    //   // Remove active class from all chat items
    //   chatItems.forEach((i) => i.classList.remove("active"));
    //   // Add active class to the clicked chat item
    //   item.classList.add("active");
    //   // Get chat name from the clicked item
    //   const chatName = item.getAttribute("chat_name").textContent;
    //   // Find the corresponding chat data
    //   const chatData = chatList.find((chat) => chat.name === chatName);
    //   // Update chat header
    //   document.getElementById("headerProfile").src = chat.profilePic;
    //   document.querySelector(".chat_name").textContent = chat.name; // Assuming one element with class 'chat_name'
    //   // Update the conversation body
    //   const conversationBody = document.getElementById("chatbody");
    //   conversationBody.innerHTML = "";
    //   chat.messages.forEach((message) => {
    //     const messageDiv = document.createElement("div");
    //     messageDiv.classList.add("message", message.type);
    //     messageDiv.textContent = message.text;
    //     conversationBody.appendChild(messageDiv);
    //   });
    //   // Scroll to the bottom of the conversation body
    //   conversationBody.scrollTop = conversationBody.scrollHeight;
    // });
  };
})
// send message function
const sendMessage = () => {
  const input = document.getElementsByClassName("footerInput");
  const messageText = input.value.trim();
  if (!messageText) {
    return;
  }
  // find active chat
  const activeChatItem = document.querySelector(".chatItem.active");
  if (!activeChatItem) {
    return;
  }
  // get chat name
  const chatname = activeChatItem.getAttribute("chat_name");

  const chat = jsonData.chats.find((c) => c.name === chatname);
  chat.messages.push({ text: messageText, type: "sent" });

  const ConversationBody = document.getElementById("conversationBody");
  messageDiv.classList.add("message", "sent");
  messageDiv.textContent = messageText;
  ConversationBody.appendChild(messageDiv);
  ConversationBody.scrollTop = ConversationBody.scrollHeight;
  input.value = "";
};
