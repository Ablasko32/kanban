import Form from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

import { RootStore } from "../../stores/rootStore";

validatorjs.useLang("en");

// Define all the message templates - bypass error FIX
// Define all the message templates to bypass the error
validatorjs.setMessages("en", {
  required: "The :attribute field is required.",
  email: "The :attribute must be a valid email address.",
  string: "The :attribute must be a string.",
  between: "The :attribute must be between :min and :max.",
  same: "The :attribute and :same must match.",
  // Add any other validation messages you might need
  min: "The :attribute must be at least :min.",
  max: "The :attribute may not be greater than :max.",
  numeric: "The :attribute must be a number.",
  integer: "The :attribute must be an integer.",
  boolean: "The :attribute field must be true or false.",
  array: "The :attribute must be an array.",
  url: "The :attribute format is invalid.",
  date: "The :attribute is not a valid date.",
  alpha: "The :attribute may only contain letters.",
  alpha_num: "The :attribute may only contain letters and numbers.",
});

export class CreateTaskForm extends Form {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    super();
    this.rootStore = rootStore;
  }

  plugins() {
    return {
      dvr: dvr({ package: validatorjs }),
    };
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
