import React, { useState } from 'react';

const OPTIONS = [`all`, `basic`, `comfort`];

const App = () => {
  const [formData, setFormData] = useState({
    info: ``,
    selectedOption: `all`
  });

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    evt.preventDefault();

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const saveButtonClickHandler = () => {
    localStorage.setItem(`formData`, JSON.stringify(formData));

    setFormData({
      ...formData,
      info: ``,
      selectedOption: `all`
    });
  };

  const loadButtonClickHandler = () => {
    const savedFormData = JSON.parse(localStorage.getItem(`formData`));

    setFormData({
      ...formData,
      ...savedFormData
    });
  };

  return (
    <div className="App">
      <form action="">
        <input
          type="text"
          name="info"
          value={formData.info}
          onChange={(evt) => changeHandler(evt)}
        />
        {OPTIONS.map((option) => {
          return (
            <p key={option + formData.selectedOption}>
              <input
                type="radio"
                name="selectedOption"
                id={option}
                value={option}
                checked={option === formData.selectedOption}
                onChange={(evt) => changeHandler(evt)}
              />
              <label htmlFor={option}>{option}</label>
            </p>
          );
        })}

        <button type="button" onClick={saveButtonClickHandler}>
          Save
        </button>
        <button type="button" onClick={loadButtonClickHandler}>
          Load
        </button>
      </form>
    </div>
  );
};

export default App;