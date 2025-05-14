let chatsData = [];
const chatList = document.getElementById("chatlist");
fetch("chats.json")
  .then((response) => response.json())
  .then((data) => {
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
    chatItem.className = "chat-item";
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
  createChatList(chats);
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
searchChats();
