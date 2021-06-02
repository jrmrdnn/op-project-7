type AlertRenderProps = {
  type?: "succes" | "error";
  message?: string;
};

/**
 * Display alert
 */
export function alertRender({
  type = "error",
  message = "",
}: AlertRenderProps) {
  const alert = document.querySelector("alert-render");
  if (alert) {
    alert.setAttribute("type", type);
    alert.setAttribute("message", message);
  }
}

type MessageRenderProps = {
  render?: string;
  state?: {
    id: string;
    title: string;
    image: any;
    text: string;
  };
};

/**
 * Display messages
 */
export function messageRender({
  render = "Messages",
  state,
}: MessageRenderProps) {
  const messages = document.querySelector("messages-render");
  if (messages) {
    messages.setAttribute("render", render);
    if (state) {
      messages.setAttribute("id", state.id);
      messages.setAttribute("title", state.title);
      messages.setAttribute("image", state.image);
      messages.setAttribute("text", state.text);
    }
  }
}

/**
 * Display nav
 */
export function navRender(message: string = "Messages", identify?: boolean) {
  document.querySelector("side-nav")?.setAttribute("active", message);
  if (identify)
    document.querySelector("side-nav")?.setAttribute("identify", "true");
}

/**
 * Get message
 */
export function RecupMessage() {
  const state: any = {};
  const messages = document.querySelector("messages-render");
  if (messages) {
    state.id = messages.getAttribute("id");
    state.title = messages.getAttribute("title");
    state.imgUrl = messages.getAttribute("image");
    state.content = messages.getAttribute("text");
  }

  return state;
}
