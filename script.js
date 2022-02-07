const socket = io('http://localhost:5000');

let logContiner = document.querySelector('#logContiner');
let logerForm = document.querySelector('#logForm')
let chatContiner = document.querySelector('#chatcontiner');
let inputText = document.querySelector('#userName');
let contentMessages = document.querySelector('#messages');
let chatForm = document.querySelector('#chatForm');

function main(){
  let userName = inputText.value;
  socket.emit('newUser', userName);

  socket.on('userConected', userName =>{
    createElementWhitEstate(`${userName} conected`, contentMessages, 'conected');
  });

  socket.on('userdisconected', userName =>{
    if(userName !== null){
      createElementWhitEstate(`${userName} disconected`, contentMessages, 'disconected')
    }
  })

  form(chatForm, contentMessages);

  socket.on('emitmessage', message =>{
    createElementwhitMessage(`${message.message}`, contentMessages, 'left')
  })
}
//it is necessary to make that when giving enter enter the chat..
inputText.addEventListener('keyup', function(e){
  e.preventDefault();
  if(e.keyCode === 13){
    isEmty()
  }
})


function isEmty(){
  let formLog = logContiner.childNodes[1];
  
  if(inputText.value === ''){
    formLog.childNodes[3].innerText = inputText.validationMessage
    inputText.style.border = "2px solid rgba(238, 109, 87, 1)";
  }else{
    logContiner.style.transform = "translatey(-30em)"
    chatContiner.style.opacity = 1;
    main();
  }
}

function form (chatForm,contentMessages){
  chatForm.addEventListener('submit', e =>{
    e.preventDefault();
    let message = chatForm.childNodes[1].value;
    if(message !== ''){
      createElementwhitMessage(message, contentMessages, 'rigth');
      socket.emit('sendmessage', message)
      chatForm.childNodes[1].value = '';
    }
  })
};

function createElementWhitEstate(values, elementhtml, classname) {
  let pElement = document.createElement('p')
  pElement.className = classname
  pElement.innerText = values;
  elementhtml.appendChild(pElement);
}

function createElementwhitMessage(message, elementhtml, classname){
  let divElement = document.createElement('div')
  divElement.className = classname
  divElement.innerText = message;
  elementhtml.appendChild(divElement);
}