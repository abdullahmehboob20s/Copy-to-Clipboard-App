import React, { useState } from "react";
import styles from "./styles.module.css";
import useCopyToClipboard from "hooks/useCopyToClipboard";

const initialValues = {
  name: "",
  number: "",
  reason: "",
  resolution: "",
};

function CopyToClipboardForm() {
  const { copy, copyStatus } = useCopyToClipboard(1000);
  const [formState, setFormState] = useState(initialValues);

  let formValueChanger = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const formHandler = (e) => {
    e.preventDefault();

    copy(`Caller: ${formState.name}
MDN: ${formState.number}
Problem: ${formState.reason}
Resolution: ${formState.resolution}`);
  };

  const clearinputFilds = () => {
    setFormState(initialValues);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <h1>Notes:</h1>
        <form onSubmit={formHandler}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Your Name"
              id="name"
              name="name"
              onChange={formValueChanger}
              value={formState.name}
              disabled={copyStatus === "copied" ? true : false}
            />
          </div>
          <div>
            <label htmlFor="number">Phone Number:</label>
            <input
              type="number"
              placeholder="Your Phone Number"
              id="number"
              name="number"
              onChange={formValueChanger}
              value={formState.number}
              disabled={copyStatus === "copied" ? true : false}
            />
          </div>
          <div>
            <label htmlFor="reason">Reason For Call:</label>
            <textarea
              placeholder="Your Reason"
              id="reason"
              name="reason"
              onChange={formValueChanger}
              value={formState.reason}
              disabled={copyStatus === "copied" ? true : false}
            ></textarea>
          </div>
          <div>
            <label htmlFor="resolution">Resolution:</label>
            <textarea
              placeholder="Your Resolution"
              id="resolution"
              name="resolution"
              onChange={formValueChanger}
              value={formState.resolution}
              disabled={copyStatus === "copied" ? true : false}
            ></textarea>
          </div>
          <div className={styles.btns}>
            <button
              type="submit"
              className={copyStatus === "copied" ? styles.copied : ""}
              disabled={copyStatus === "copied" ? true : false}
            >
              {copyStatus === "copied" ? "Copied" : "Copy"}
            </button>
            <button type="button" onClick={clearinputFilds}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CopyToClipboardForm;
