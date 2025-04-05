import { ApiClient } from "../../core/ApiClient";
import { FormBase } from "../../core/FormBase";
import { RootStore } from "../../stores/rootStore";

export class CreateBoardForm extends FormBase {
  apiClient = new ApiClient();

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
        const { boardName } = form.values();
        try {
          self.rootStore.boardStore.addBoard({ name: boardName });
          form.clear();
          form.reset();
          self.rootStore.boardStore.fetchAllBoards();
          self.rootStore.notificationStore.sendSucess("Board created");
        } catch (err) {
          console.error(err);
          self.rootStore.notificationStore.sendError("Failed to create board");
        }
      },
      onError(form) {
        self.rootStore.notificationStore.sendSucess("Form has errors");
      },
    };
  }
}
