

const userList =[];

//join user to chat

function addUser(id, username, room){
    const user ={id, username, room};

    userList.push(user);
    console.log(userList);
    return user;
}

//Get current user
function getCurrentUser(id){
    return userList.find(user => user.id === id);
}

//delete user from the list when it leaves
function leave(id){
    const index = userList.findIndex(user=> user.id === id);

    if(index!=-1)
    {
        return userList.splice(index, 1)[0];
    }

}

//return users from a particular room
 function roomList(room){
    return userList.filter(user=> user.room === room);
 }

module.exports={
    addUser,
    getCurrentUser,
    leave,
    roomList
}