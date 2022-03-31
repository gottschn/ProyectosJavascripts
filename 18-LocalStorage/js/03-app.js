// En este video veamos como eliminar elementos del storage...

localStorage.removeItem('nombre');

// En cuanto a toda la funcionalidad de un CRUD, nos haria falta un update, no hay como tal un Update... lo que podrías hacer es...

const mesesArray = JSON.parse(localStorage.getItem('meses'));
console.log(mesesArray)
mesesArray.push('nuevo Mes');
console.log(mesesArray);
localStorage.setItem('meses', JSON.stringify(mesesArray))