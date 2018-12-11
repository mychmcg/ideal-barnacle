import React, { useState } from "react";

const useInputValue = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e: any) => setValue(e.target.value)
  };
};

const Form = (onSubmit: {
  onSubmit: ((weight: string, unit: string, reps: string, rpe: string) => void);
}) => {
  const weight = useInputValue("0");
  const unit = useInputValue("lbs");
  const reps = useInputValue("1");
  const rpe = useInputValue("8");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit.onSubmit(weight.value, unit.value, reps.value, rpe.value);
      }}
    >
      <div className="weight-field field">
        <label className="field-label" htmlFor="weight">
          Weight:
        </label>
        <input type="text" id="weight" {...weight} />
        <select name="unit" id="unit" {...unit}>
          <option value="lbs">lbs</option>
          <option value="kgs">kgs</option>
        </select>
      </div>
      <div className="reps-field field">
        <label className="field-label" htmlFor="reps">
          Reps:
        </label>
        <input type="text" id="reps" {...reps} />
      </div>
      <div className="rpe-field field">
        <label className="field-label" htmlFor="rpe">
          RPE:
        </label>
        <select name="rpe" id="rpe" {...rpe}>
          <option value="10">10</option>
          <option value="9">9</option>
          <option value="8">8</option>
          <option value="7">7</option>
          <option value="6">6</option>
          <option value="5">&#10877;5</option>
        </select>
      </div>
      <button>+ Add Set</button>
    </form>
  );
};

export default Form;
