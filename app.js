import { MultiStepButton } from './multiStepButton.js';

let stepContent = [
  [
    { text: 'Legg til flere' }
  ],
  [
    { text: 'Melodi forfatter' },
    { text: 'Tekst forfatter' }
  ],
  [
    { text: 'Gutt' },
    { text: 'Jente' }
  ],
  [
    { 
      label: '',
      avatar: '' 
    }
  ]
]

const el = document.querySelector('.input-card');
const button = new MultiStepButton(el, stepContent);