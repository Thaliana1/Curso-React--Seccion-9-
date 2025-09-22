
export interface ScrambleWordState {
  words: string[];
  currentWord: string;
  scrambledWord: string;
  guess: string;
  points: number;
  errorCounter: number;
  maxAllowErrors: number;
  skipCounter: number;
  maxSkips: number;
  isGameOver: boolean;
  totalWordsState: number;
}

// Acciones
export type ScrambleWordAction =
  | { type: 'SET_GUESS', payload: string } // ESTABLECER LA PALABRA QUE ESCRIBE EL USUARIO
  | { type: 'CHECK_ANSWER' }               // COMPROBAR SI LA PALABRA ES CORRECTA
  | { type: 'SKIP_WORD'} 
  | { type: 'START_NEW_GAME', payload: ScrambleWordState};                           
 
const GAME_WORDS = [
  'REACT',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'HTML',
  'ANGULAR',
  'SOLID',
  'NODE',
  'VUEJS',
  'SVELTE',
  'EXPRESS',
  'MONGODB',
  'POSTGRES',
  'DOCKER',
  'KUBERNETES',
  'WEBPACK',
  'VITE',
  'TAILWIND',
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};


// Estado inicial
export const getInitialState = (): ScrambleWordState => {
  const shuffleWords = shuffleArray(GAME_WORDS);

  return {
    words: shuffleWords,
    currentWord: shuffleWords[0],
    scrambledWord: scrambleWord(shuffleWords[0]),
    guess: '',
    points: 0,
    errorCounter: 0,
    maxAllowErrors: 3,
    skipCounter: 0,
    maxSkips: 3,
    isGameOver: false,
    totalWordsState: shuffleWords.length,
  };
};

// Reducer
export const scrambleWordReducer = (
  state: ScrambleWordState,
  action: ScrambleWordAction
): ScrambleWordState => {
  switch (action.type) {
    
    // ESTABLECER LA PALABRA QUE ESCRIBE EL USUARIO
    case 'SET_GUESS':
      return {
        ...state,
        guess: action.payload.trim().toUpperCase(),
      };



    // COMPROBAR SI LA PALABRA ES CORRECTA
    case 'CHECK_ANSWER':
      // SI SE EFECTUA DE MANERA EXITOSA
      if (state.currentWord === state.guess) {
        const newWords = state.words.slice(1);

        return {
          ...state,
          words: newWords,
          points: state.points + 1,
          guess: '',
          currentWord: newWords[0],
          scrambledWord: scrambleWord(newWords[0]),
        };
      }

      // SI NO SE EFECTUA DE MANERA EXITOSA
      return {
        ...state,
        errorCounter: state.errorCounter + 1,
        guess: '',
        isGameOver:
          state.errorCounter + 1 >= state.maxAllowErrors ? true : false,
      };
    
    

    
    case 'SKIP_WORD': {
        //VERIFICAR LA CANTIDADS COMPLETAÇ
      if (state.skipCounter >= state.maxSkips) return state;
      const updatedWords = state.words.slice(1);

        return {
            ...state,
            skipCounter: state.skipCounter + 1,
            words: updatedWords,
            currentWord: updatedWords[0],
            scrambledWord: scrambleWord(updatedWords[0]),
            guess: '',
           
        };
    
    }
    
    case 'START_NEW_GAME': {
        // 1 Forma: return getInitialState();
        return action.payload;


        
    }

    default:
      return state;
  }
};