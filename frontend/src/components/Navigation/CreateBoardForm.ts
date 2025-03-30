import { FormBase } from "../../core/FormBase";
import { RootStore } from "../../stores/rootStore";

export class CreateBoardForm extends FormBase {
  constructor(rootStore: RootStore) {
    super(rootStore);
  }

  setup(): { fields: any[] } {
    return {
      fields: [
        {
          name: "boardName",
          label: "Board name",
          placeholder: "Name of the board",
          type: "text",
          rules: "required|string|min:3",
        },
      ],
    };
  }

  hooks() {
    const self = this;
    return {
      onSuccess(form) {
        alert("Form is good");
        form.clear();
      },
      onError(form) {
        alert("Form has errors!");
      },
    };
  }
}
