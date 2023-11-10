const contactlistArray = [];
const message = "Var god fyll i båda fälten korrekt";

function rendercontactlist() {
  let contactlistArrayHTML = "";

  for (let i = 0; i < contactlistArray.length; i++) {
    const contactObject = contactlistArray[i];
    const { name, phone } = contactObject;
    const html = `
            <input class='input input-color' id='nameInput-${i}' type='text' value=${name} readonly> 
            <input class='input input-color' id='phoneInput-${i}' type='tel' value=${phone} readonly> 
            <button id='editButton-${i}' onclick='edit(${i})' class='edit'>Ändra</buuton>
            <button onclick='remove(${i})' class='remove'>Radera</button>
            `;
    contactlistArrayHTML += html;
  }
  document.querySelector(".contactlist").innerHTML = contactlistArrayHTML;
}

function add() {
  const nameInput = document.getElementById("name").value;
  const phoneInput = document.getElementById("phonenumber").value;
  let errorMessage = document.getElementById("errormessage");

  if (isValid(nameInput, phoneInput)) {
    const form = document.getElementById("contactlistform");
    form.reset();
    contactlistArray.push({ name: nameInput, phone: phoneInput });
    errorMessage.innerHTML = "";

    rendercontactlist();
  } else {
    errorMessage.innerHTML = message;
  }
}
function edit(index) {
  let errorMessage = document.getElementById("message");

  const nameInput = document.getElementById(`nameInput-${index}`);
  nameInput.removeAttribute("readonly");
  nameInput.className = "input";
  const phoneInput = document.getElementById(`phoneInput-${index}`);
  phoneInput.removeAttribute("readonly");
  phoneInput.className = "input";
  const button = document.getElementById(`editButton-${index}`);
  button.innerHTML = "Spara";
  button.className = "add";
  button.removeAttribute("onclick");
  button.onclick = saveEdit;

  function saveEdit() {
    if (isValid(nameInput.value, phoneInput.value)) {
      nameInput.setAttribute("readonly", true);
      phoneInput.setAttribute("readonly", true);
      nameInput.className = "input input-color";
      phoneInput.className = "input input-color";
      button.innerHTML = "Ändra";
      button.className = "edit";
      errorMessage.innerHTML = "";

      button.onclick = () => edit(index);
    } else {
      errorMessage.innerHTML = message;
    }
  }
}

function isValid(name, phone) {
  if (name && phone.length >= 10 && phone.length < 11) {
    return true;
  }
  return false;
}
function removeList() {
  contactlistArray.length = [];
  rendercontactlist();
}

function remove(index) {
  contactlistArray.splice(index, 1);
  rendercontactlist();
}
