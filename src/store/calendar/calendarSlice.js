import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: "Cumpleaños del jefe",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: "#fafafa",
    notes: "Comprar el pastel",
    user: {
        _id: "123",
        name: "Matias",
    },
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, action) => {
            state.activeEvent = action.payload;
        }
    }
});


export const { onSetActiveEvent } = calendarSlice.actions;