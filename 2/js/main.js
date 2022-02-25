// Ссылка на источник откуда взял функцию getRandomInRange https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random и https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed, и добавил проверку вводных значений
function getRandomInRange(min, max, num) {
  if(min < 0 || max < min ) {
    return false;
  }
  return (Math.random() * (max - min) + min).toFixed(num);
}

console.log(getRandomInRange(1, 10.1, 3));
