import Notiflix from 'notiflix';

const form = document.querySelector('.form');


form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();

let data = {
  amount: form.amount.value,
  delay: form.delay.value,
  step: form.step.value,
};
  
  let amount = Number(data.amount);
  console.log(amount);
  let delay = Number(data.delay);
  console.log(delay);
  let step = Number(data.step);
  console.log(step);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
  
    delay += step;
  }
  
}
  
const createPromise = (position, delay) => {
        
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
        reject({ position, delay });
  })
};


