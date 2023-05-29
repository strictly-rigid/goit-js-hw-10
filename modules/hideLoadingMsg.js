import { refs }  from '../modules/refs.js'

export default function hideMLoadinMsg() {
    refs.loadingMsg.classList.add('visually-hidden');
}

