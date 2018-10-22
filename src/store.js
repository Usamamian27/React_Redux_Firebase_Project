import {createStore , combineReducers , compose} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase , firebaseReducer} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';



///  Reducers goes here///

import notifyReducer from './reducers/notifyReducer';



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
    notify : notifyReducer
})


//// Create initial state ////
const initialState = {

}

/// Create Store

const store = createStoreWithFirebase(rootReducer , initialState ,compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()

))


export default store;


