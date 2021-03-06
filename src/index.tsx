import React from 'react';
import ReactDOM from 'react-dom';
import LogRocket from 'logrocket';
import App from './components/App';
import {autorun} from 'mobx';
import RoomStore from "./stores/RoomStore";
import UIStore from "./stores/UIStore";

if(process.env.NODE_ENV !== "development"){
    LogRocket.init('wbok98/bitlink');
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);


// @ts-ignore
if (!window.navigator.standalone) { // ios is stupid. If i try to change url bar stuff gets messed up in PWA
    autorun(() => {
        if (!RoomStore.room) {
            const modalStore = UIStore.store.modalStore;
            if (modalStore.join) {
                window.history.replaceState({}, "BitLink | Join ", '/join');
            } else if (modalStore.create) {
                window.history.replaceState({}, "BitLink | Create ", '/create');
            } else {
                window.history.replaceState({}, "BitLink | Create ", '/');
            }
            return;
        }
        window.history.replaceState({}, "BitLink | Join " + RoomStore.room.name, '/join/' + RoomStore.room.id);
    });
}
