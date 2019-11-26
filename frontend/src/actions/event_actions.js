import * as EventAPIUtil from "../util/event_api_util";
// import jwt_decode from "jwt-decode";

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const RECEIVE_USER_EVENTS = "RECEIVE_USER_EVENTS";
// export const RECEIVE_USER_RESERVATION_EVENT =
//          "RECEIVE_USER_RESERVATION_EVENT";

const receiveEvents = events => ({
    type: RECEIVE_EVENTS,
    events
});

const receiveEvent = event => ({
    type: RECEIVE_EVENT,
    event
});

const receiveUserEvents = events => ({
    type: RECEIVE_USER_EVENTS,
    events
});


export const getEvents = () => dispatch =>
    EventAPIUtil.getEvents()
        .then(events => dispatch(receiveEvents(events)))
        .catch(err => console.log(err));

export const getEvent = id => dispatch =>
    EventAPIUtil.getEvent(id)
        .then(event => {
            if (new Date(event.data.time) >= new Date()) {
              dispatch(receiveEvent(event));
            }
        })
        .catch(err => console.log(err));















export const createEvent = event => dispatch =>
         EventAPIUtil.createEvent(event)
           .then(event => dispatch(receiveEvent(event)))
           .catch(err => console.log(err));

export const updateEvent = event => dispatch =>
    EventAPIUtil.updateEvent(event)
        .then(event => dispatch(receiveEvent(event)))
        .catch(err => console.log(err));


export const fetchUserEvents = id => dispatch =>
    EventAPIUtil.getUserEvents(id)
        .then(events => {
            dispatch(receiveUserEvents(events))
        })
        .catch(err => console.log(err));
