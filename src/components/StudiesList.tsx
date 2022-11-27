import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/index";
import { StudiesState, fetchStudies, fetchTrials } from "../store/studies";

export const StudiesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: studies, loading, error } = useSelector<
    RootState,
    StudiesState
  >(state => state.studies);
  return (
    <>
      <button onClick={() => dispatch(fetchStudies())}>Fetch Studies</button>
      <h1>Studies</h1>
      {loading && <>Loading!</>}
      {error && <>Error: {error}</>}
      <ul>
        {studies?.map(study => (
          <li key={study.name} onClick={() => dispatch(fetchTrials(study.name))}>
            <h1>{study.name} {study.date} {study.completed}</h1>
            <ul>
              {study.trials?.map(trial => <li key={trial.name}>{trial.name}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};
