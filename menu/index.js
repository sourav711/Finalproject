const name = 'László Horváth';

let getMonogram = (name) => {
  const words = name.toUpperCase().split(' ');
  let result = '';
  
  words.forEach(value => {
    result += value[0];
  });
  
  return result;
};

const monogram = getMonogram(name);

$('.profile__monogram').text(monogram);
$('.profile__name').text(name);