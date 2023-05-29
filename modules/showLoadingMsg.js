import { refs }  from '../modules/refs.js'

export default function showLoadingMsg() {
    refs.loadingMsg.classList.remove('visually-hidden');
}