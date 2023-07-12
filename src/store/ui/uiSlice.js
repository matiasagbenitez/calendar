import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
name: 'ui',
    initialState: {
        isDateModalOpen: false,
    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;

            // Sin toolkit sería:
            // return {
            //     ...state,
            //     isDateModalOpen: true
            // }
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        }
    }
});


export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;