

const getData = () => fetch('https://25.javascript.pages.academy/keksobooking/data');

const sendData = (body) =>
  fetch(
    'https://25.javascript.pages.academy/keksobooking1/',
    {
      method: 'POST',
      type: 'multipart/form-data',
      body,
    },
  );

export {getData, sendData};

