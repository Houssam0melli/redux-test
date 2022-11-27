import { AppThunk } from "./index";
import { createAsyncSlice, AsyncState } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";

export interface Trial {
  name: string;
}

export interface Study {
  name: string;
  date: string;
  completed: boolean;
  trials?: Trial[];
}

export type StudiesState = AsyncState<Study[]>;

export const studiesSlice = createAsyncSlice({
  name: "studies",
  initialState: {
    studies: [] as Study[],
    loading: false,
    error: null
  } as StudiesState,
  reducers: {
    successTrials: (
      state,
      action: PayloadAction<{ trials: Trial[]; studyName: string }>
    ) => {
      // I thought this was meant to be immutable - It is, redux is using immer behind the scenes! https://redux-toolkit.js.org/api/createslice#reducers https://redux-toolkit.js.org/api/createReducer#direct-state-mutation
      const foundStudy = state.data?.find(study => study.name === action.payload.studyName);
      if (foundStudy) {
        foundStudy.trials = action.payload.trials;
      }
      state.loading = false;
    }
  }
});

// mock api call
// waits for ms
const wait = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(() => resolve(), ms));

let count = 0;
const fetchData = async (): Promise<{ json: () => Promise<Study[]> }> => {
  await wait(1000);
  // throw error on second attempt
  if (count < 1) {
    count++;
    return {
      json: () =>
        Promise.resolve([
          {
            name: "First Study",
            date: "March 3",
            completed: false
          },
          {
            name: "Second Study",
            date: "July 4",
            completed: true
          }
        ])
    };
  } else if (count === 1) {
    count++;
    return {
      json: () =>
        Promise.resolve([
          {
            name: "Different study",
            date: "November 29",
            completed: true
          },
          {
            name: "Wow, redux is nice",
            date: "December 10",
            completed: true
          }
        ])
    };
  }

  throw new TypeError("Invalid request!");
};

const fetchTrialsAPI = async (): Promise<Trial[]> => {
  await wait(1000);
  return [{ name: "Trail 1" }, { name: "Trail 2" }];
};

// async fetch
const { start, success, error, successTrials } = studiesSlice.actions;

export const fetchStudies = (): AppThunk => async dispatch => {
  dispatch(start());
  try {
    const response = await fetchData();
    const studies = await response.json();
    console.log(studies);
    dispatch(success(studies));
  } catch (err) {
    dispatch(error(err.toString()));
  }
};

export const fetchTrials = (studyName: string): AppThunk => async dispatch => {
  dispatch(start());
  try {
    const trials = await fetchTrialsAPI();
    dispatch(successTrials({ studyName, trials }));
  } catch (error) {
    dispatch(error(error.toString()));
  }
};
