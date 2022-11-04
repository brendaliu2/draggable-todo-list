import React, { useState } from "react";

/** Form for adding.
 *
 * Props:
 * - initialFormData
 * - handleSave: function to call in parent.
 *
 * { DraggableTodoApp, EditableTodo } -> NewTodoForm
 */
export default function NewTodoForm({ initialFormData = {
  content: "",
},
  handleSave
}) {

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSave(formData);
    setFormData(initialFormData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="newTodo-content"
        name="content"
        placeholder="new task"
        onChange={handleChange}
        value={formData.content}
        aria-label="content"
      />
      <button>Add</button>
    </form>
  );
}