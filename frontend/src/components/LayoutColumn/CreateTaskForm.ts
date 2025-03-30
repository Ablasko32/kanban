import { RootStore } from "../../stores/rootStore";
import { FormBase } from "../../core/FormBase";

export class CreateTaskForm extends FormBase {
  constructor(rootStore: RootStore) {
    super(rootStore);
  }

  setup() {
    return {
      fields: [
        {
          name: "taskTitle",
          label: "Task title",
          placeholder: "Task title",
          type: "text",
          value: "",
          rules: "required|string|min:3",
        },
        {
          name: "taskDescription",
          label: "Task description",
          placeholder: "Task description",
          type: "text",
          value: "",
          rules: "string",
        },
        {
          name: "taskPriority",
          label: "Task priority",
          placeholder: "Task priority",
          type: "select",
          options: [
            { value: "low", label: "low" },
            { value: "med", label: "medium" },
            { value: "high", label: "high" },
          ],
          rules: "required",
        },
        {
          name: "type",
          type: "hidden",
        },
      ],
    };
  }

  hooks() {
    const self = this;
    return {
      /*
        Success Validation Hook
      */
      onSuccess(form) {
        const formValues = form.values();
        const newTask = {
          id: crypto.randomUUID(),
          name: formValues.taskTitle,
          description: formValues.taskDescription,
          priority: formValues.taskPriority,
          createdAt: new Date(),
          status: formValues.type,
        };

        self.rootStore.taskStore.handleAddTask(newTask);
        form.clear();
        form.reset();
        self.rootStore.notificationStore.sendSucess(
          "Task was saved sucesfully."
        );
      },
      /*
        Error Validation Hook
      */
      onError(form) {
        alert("Form has errors!");
        // get all form errors
        console.log("All form errors", form.errors());
        self.rootStore.notificationStore.sendError("Error saving task.");
      },
    };
  }
}
