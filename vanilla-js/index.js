const form = document.querySelector(`form`);
const saveButton = document.querySelector(`.save`);
const loadButton = document.querySelector(`.load`);
const textField = document.querySelector(`input[type="text"]`);
const radioInputs = document.querySelectorAll(`input[type="radio"]`);

const onSaveButtonPress = (evt) => {
  evt.preventDefault();

  let formdata = new FormData(form);

  for (let pair of formdata.entries()) {
    localStorage.setItem(pair[0], pair[1]);
  }

  form.reset();
}

const onLoadButtonClick = () => {
  radioInputs.forEach((radio) => {
    radio.defaultChecked = false;
  });

  radioInputs.forEach((radio) => {
    if (radio.id === localStorage.getItem(`option`)) {
      radio.defaultChecked = true;
    }
  });

  textField.value = localStorage.getItem(`info`);
}

form.addEventListener(`submit`, (evt) => onSaveButtonPress(evt));
loadButton.addEventListener(`click`, onLoadButtonClick);