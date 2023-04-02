//reader chat templates to the DOM
// clear the list of cahts (when the room change)
// import {chatList} from '../scripts/chat';
class ChatUI{
    constructor(list){
        this.list = list
    }
    render(data){
        const html =`
        <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${data.created_at.toDate()}</div>
        `
        this.list.innerHTML +=html;
    }
}
