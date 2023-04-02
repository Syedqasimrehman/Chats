
import { getFirestore, collection, onSnapshot,
   serverTimestamp,Timestamp, addDoc, where, query, orderBy } from "firebase/firestore"
import { initializeApp } from "firebase/app";
// import {formatDistanceStrict,formatDistance, formatDistanceToNow, format} from 'date-fns';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict/index";
// import "https://cdn.jsdelivr.net/npm/date-fns/index.min.js"
const firebaseConfig = {
  apiKey: "AIzaSyDKO-MCFjtvf_Clct1YS37lY2gm7YY51I8",
  authDomain: "real-time-chat-room-3fb32.firebaseapp.com",
  projectId: "real-time-chat-room-3fb32",
  storageBucket: "real-time-chat-room-3fb32.appspot.com",
  messagingSenderId: "783723490536",
  appId: "1:783723490536:web:cd9968f32d959a10af2d5d"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
// let formatDistanceToNow = require('date-fns/formatDistanceToNow')
const chatList =document.querySelector('.chat-window');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const UpdateMessg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms')
const now = new Date();

// add a new chat 
newChatForm.addEventListener('submit',e=>{
  e.preventDefault()
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
  .then(() => newChatForm.reset())
  .catch(err => console.log(err))
})

// update room 
rooms.addEventListener('click' ,e =>{
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.UpdateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat =>chatUI.render(chat))
  }
})

// update username 
newNameForm.addEventListener('submit' , e=> {
  e.preventDefault()
  const newName = newNameForm.name.value.trim();
  chatroom.UpdateName(newName);
  //reset the form
  newNameForm.reset()
  // show then hide the update message
  UpdateMessg.innerText = `Your name was updated to ${newName}`
  setTimeout(() => {  
    UpdateMessg.innerText = ``
  }, 3000);
});
// check local storage for a name
const username = localStorage.username ? localStorage.username : 'Unknown';

// Update UI
class ChatUI {
  constructor(list){
    this.list = list
  }
  clear(){
    this.list.innerHTML = ``;
  }
  render(data){
    const html =`
    <li class="list-group-item">
    <span class="username">${data.username}</span>
      <span class="message">${data.message}</span>
      <div class="time">${data.created_at ? data.created_at.toDate():''}</div>
      `
      this.list.innerHTML += html;
    }
    
  }
  
 
const chatUI = new ChatUI(chatList)
 
export class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = collection(db, 'real chat');
    this.Unsubscribe;
  }
  // async is promise base 
 
  async addChat(message) {
    
    addDoc(this.chats, {
      message,
      username: this.username,
      room: this.room,
      created_at: serverTimestamp(now)
    });

    const response = this.chats
    return response;
  }
  getChats(callback) {
    onSnapshot(
      query(
        this.Unsubscribe = this.chats,
         where('room', '==', this.room )
        // ,where('username' , '==' , this.username)
        , orderBy('created_at')
        )
      , snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            callback(change.doc.data());
          }
        });
      });
  }
  UpdateName(username){
    this.username = username;
    localStorage.setItem('username' , username)
  }
  UpdateRoom(room){
    this.room = room;
    console.log("room updated")
    if(this.Unsubscribe){
      this.Unsubscribe;
    }
  }
}

const chatroom = new Chatroom('general', username);
chatroom.getChats(data =>{
  chatUI.render(data)
})

// compareAsc(format(now))

