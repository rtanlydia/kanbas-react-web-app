import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Quiz {
  _id: string;
  title: string;
  course: string;
}

interface QuizzesState {
  quizzes: Quiz[];
}

const initialState: QuizzesState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    addQuizzes: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },
    deleteQuizzes: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(a => a._id !== action.payload);
    },
    updateQuizzes: (state, action: PayloadAction<Quiz>) => {
      const index = state.quizzes.findIndex(a => a._id === action.payload._id);
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },
  },
});

export const { setQuizzes, addQuizzes, deleteQuizzes, updateQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;
