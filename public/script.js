const socket = io()

const chatForm = document.getElementById("chat-form");
const chatmsg =  document.querySelector(".chat-messages");

//getting username and room from the login page
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});

//sending username and room to the server
socket.emit("newUser", {username,room});


socket.on("room",({room,users})=>{
   let members = document.querySelector("#users");
   members.innerHTML=""
   users.forEach(user => {
        const li = document.createElement("li");
        li.innerText=`${user.username}`;
        members.appendChild(li);
   });
   document.querySelector("#room-name").innerText=`${room}`
})

  


socket.on("message",message=>{
    alert(`${message.text}`);
})

socket.on("cmessage",msg=>{
    //add the message to the DOM
    const newel = document.createElement("div")
    newel.innerHTML =` <div class="message">
    <p class="meta">${msg.username}<span>${msg.time}</span></p>
    <p class="text">
        ${msg.text}
    </p>
</div>`
    document.querySelector(".chat-messages").appendChild(newel)
//on receiving new messages scroll to the bottom 
    chatmsg.scrollTop = chatmsg.scrollHeight;

})

//message submit
chatForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    //emit message to the server
    socket.emit("chatMessage", msg);

    //after sending the message clear the chatbox and auto focus

     e.target.elements.msg.value="";
     e.target.elements.msg.focus();
    
})