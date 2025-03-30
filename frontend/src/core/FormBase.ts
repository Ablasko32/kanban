import Form from "mobx-react-form";

import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { RootStore } from "../stores/rootStore";

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

export abstract class FormBase extends Form {
  rootStore: RootStore;

  plugins() {
    return {
      dvr: dvr({ package: validatorjs }),
    };
  }

  constructor(rootStore: RootStore) {
    super();
    this.rootStore = rootStore;
  }

  abstract setup(): { fields: any[] };
  abstract hooks(): any;
}
