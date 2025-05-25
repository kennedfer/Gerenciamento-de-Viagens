import { OverlayToaster, Position } from "@blueprintjs/core";

class ToastCreator {
  toaster;

  constructor() {
    (async () => {
      this.toaster = await OverlayToaster.createAsync({
        position: Position.TOP,
      });
    })();
  }

  success(message) {
    this.toaster.show({
      message,
      intent: "success",
    });
  }

  warning(message) {
    this.toaster.show({
      message,
      intent: "warning",
    });
  }

  danger(message) {
    this.toaster.show({
      message,
      intent: "danger",
    });
  }
}

export const Toaster = new ToastCreator();
