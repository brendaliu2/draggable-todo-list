import { render, screen, fireEvent } from '@testing-library/react';
import TaskTracker from './TaskTracker';

test('renders todo column', () => {
  render(<TaskTracker />);
  const todoColumn = screen.getByText(/To Do/i);
  expect(todoColumn).toBeInTheDocument();
});

test('renders in progress column', () => {
  render(<TaskTracker />);
  const todoColumn = screen.getByText(/In Progress/i);
  expect(todoColumn).toBeInTheDocument();
});

test('renders done column', () => {
  render(<TaskTracker />);
  const todoColumn = screen.getByText(/Done/i);
  expect(todoColumn).toBeInTheDocument();
});


/** Convenience method for adding a box in these tests. */
function addTodo(container,
  content = "testTask",
) {
  const titleInput = container.querySelector("#newTodo-content");

  fireEvent.change(titleInput, { target: { value: content } });

  // better to test the button than submitting the form directly --- this way,
  // we are testing whether the button works as expected
  const button = container.querySelector(".NewTodoForm-addBtn");
  fireEvent.click(button);
}

describe("adding todos", function() {
  it("can add a new todo", function () {
    const { container } = render(<TaskTracker />);

    addTodo(container);

    // expect to see a todo
    const todo = container.querySelector(".TaskTracker");
    expect(todo).toBeInTheDocument();
  });
})
