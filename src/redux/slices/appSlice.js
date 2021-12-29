import { createSlice } from '@reduxjs/toolkit'

export const selectedElementSlice = createSlice({
  name: 'Elements',
  initialState: {
    selectedFolderId: null,
    selectedNoteId: null
  },
  reducers: {
    selectFolder : (state, action) => {
      state.selectedFolderId = action.payload
    },
    selectNote : (state, action) => {
        state.selectedNoteId = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { selectFolder,selectNote } = selectedElementSlice.actions

export default selectedElementSlice.reducer