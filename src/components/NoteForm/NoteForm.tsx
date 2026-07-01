import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import type { NewNote, NoteTag } from "../../types/note";

import css from "./NoteForm.module.css";

const NOTE_FORM_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title too long")
    .required("Title is required")
    .trim(),
  content: Yup.string().max(500, "Content too long").trim(),
  tag: Yup.string().oneOf(
    ["Todo", "Work", "Personal", "Meeting", "Shopping"],
    "Invalid tag",
  ),
});

interface NoteFormProps {
  onCancel: () => void;
  onSubmit: (note: NewNote) => void;
}

export default function NoteForm({ onCancel, onSubmit }: NoteFormProps) {
  const formId = useId();

  function handleSubmit(data: {title: string, content: string, tag: string}): void {
    onSubmit({
      title: data.title.trim(),
      content: data.content.trim(),
      tag: data.tag as NoteTag
    });
  }

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      onSubmit={handleSubmit}
      validationSchema={NOTE_FORM_SCHEMA}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${formId}-title`}>Title</label>
          <Field
            id={`${formId}-title`}
            type="text"
            name="title"
            className={css.input}
            autoComplete="off"
          />
          <ErrorMessage name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${formId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${formId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${formId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${formId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
