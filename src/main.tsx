import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';


import './index.css'


//import { HooksApp } from './04-hooks-app/HooksApp';
//import { TrafficLight } from './02-useEffect/TrafficLight';
//import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect';
//import { TrafficLightWithHook } from './02-useEffect/TrafficLightWithHook';
//import { PokemonPage } from './03-examples/PokemonPages';
import {FocusScreen} from './04-useRef/FocusScreen';


createRoot(document.getElementById('root')!).render(
  <StrictMode>

   {/*<HooksApp/>*/}
   {/*<TrafficLight/>*/}
   {/*<TrafficLightWithEffect/>*/}
   {/*<TrafficLightWithHook/>/*/}
   {/*<PokemonPage/>*/}
   
   <FocusScreen/>

  </StrictMode>
)
