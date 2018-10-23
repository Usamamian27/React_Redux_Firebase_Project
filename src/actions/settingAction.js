import {DISABALE_BALANCE_ON_ADD ,DISABALE_BALANCE_ON_EDIT,ALLOW_REGISTRATION} from '../actions/types';

export const setDisableBalanceOnAdd = ()=>{

    // Get settings from local storage
    const  setting  = JSON.parse(localStorage.getItem('setting'));

    // Toggle the value
    setting.disableBalanceOnAdd = ! setting.disableBalanceOnAdd

    // Set back to settings
    localStorage.setItem('setting',JSON.stringify(setting));




    return {
        type : DISABALE_BALANCE_ON_ADD,
        payload: setting.disableBalanceOnAdd
    }
}

export const setDisableBalanceOnEdit = ()=>{

    // Get settings from local storage
    const  setting  = JSON.parse(localStorage.getItem('setting'));

    // Toggle the value
    setting.disableBalanceOnEdit = ! setting.disableBalanceOnEdit

    // Set back to settings
    localStorage.setItem('setting',JSON.stringify(setting));


    return {
        type : DISABALE_BALANCE_ON_EDIT,
        payload: setting.disableBalanceOnEdit
    }
}

export const setAllowRegistration = ()=>{

    // Get settings from local storage
    const  setting  = JSON.parse(localStorage.getItem('setting'));

    // Toggle the value
    setting.allowRegistration = ! setting.allowRegistration

    // Set back to settings
    localStorage.setItem('setting',JSON.stringify(setting));

    return {
        type : ALLOW_REGISTRATION,
        payload: setting.allowRegistration
    }
}


