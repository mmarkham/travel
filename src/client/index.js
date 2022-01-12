import './styles/style.scss';
import { init } from './js/app';
import { CalcTripLength } from './js/tripLength';

window.addEventListener('DOMContentLoaded', init);

export { init, CalcTripLength };