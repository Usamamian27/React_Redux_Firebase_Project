import {createStore , combineReducers , compose} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase , firebaseReducer} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';



///  Reducers goes here///

import notifyReducer from './reducers/notifyReducer';
import settingReducer from './reducers/settingReducer';



const firebaseConfig = {
    apiKey: "AIzaSyDIqc0HSTCF4zsV8fIvAV5SIkjKawsLj5Q",
    authDomain: "reactclientpanel-usamamian.firebaseapp.com",
    databaseURL: "https://reactclientpanel-usamamian.firebaseio.com",
    projectId: "reactclientpanel-usamamian",
    storageBucket: "reactclientpanel-usamamian.appspot.com",
    messagingSenderId: "841912358059"
}

// react-redux-firebase config//
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

/// initialize firebase instance ////
firebase.initializeApp(firebaseConfig);



// initialize firestore  //
const firestore = firebase.firestore().settings({timestampsInSnapshots :true});



// Add reactreduxfirebase enhancer when making store creator ///
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);



// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify : notifyReducer,
    setting: settingReducer
})


/// Check for Settings in local storage

if (localStorage.getItem('setting') == null){

    // Default Settings

    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false

    }

    // set to local storage
    localStorage.setItem('setting',JSON.stringify(defaultSettings));
}

//// Create initial state ////
const initialState = {

    setting : JSON.parse(localStorage.getItem(('setting')))
}



/// Create Store

const store = createStoreWithFirebase(rootReducer , initialState ,compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()

))


export default store;


