import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";

export const CompletedStudies: React.FC = () => {
  const completed = useSelector<RootState, undefined | number>(state =>
    state.studies.data?.reduce(
      (sum, study) => (study.completed ? sum + 1 : sum),
      0
    )
  );
  return <>Completed so far: {completed === undefined ? 0 : completed}</>;
};
