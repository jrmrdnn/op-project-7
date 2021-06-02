import { alertRender, navRender } from "./render";
import socket from "./socket";

/**
 * Send server
 * @param event event
 * @param state data
 * @param url url
 */
export async function handleSubmit(event: any, state: object, url: string) {
  event.preventDefault();

  // Cancels previous alerts
  alertRender({});

  // Recovers data
  // Send data
  try {
    const response = await fetch(`/api/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
      },
      body: JSON.stringify(state),
    });
    const data = await response.json();

    // Stock the Token
    if (data.token) window.localStorage.setItem("token", data.token);

    // Display alert
    alertRender({ type: data.type, message: data.message });

    // Display messages
    if (data.type === "succes")
      window.setTimeout(() => window.location.reload(), 2000);
  } catch {
    // Display Error
    alertRender({ message: "Erreur" });
  }
}

/**
 * Send message server
 * @param event event
 * @param state data
 */
export async function handleSubmitMessage(
  event: any,
  state: {
    id: string | null;
    title: string;
    content: string;
    file: any;
  }
) {
  event.preventDefault();

  // Cancels previous alerts
  alertRender({});

  // Send or delete data
  const formData = new FormData();
  formData.append("title", state.title);
  formData.append("content", state.content);
  formData.append("image", state.file);
  try {
    const response = await fetch(
      `/api/message${state.id ? "/" + state.id : ""}`,
      {
        method: state.id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
        },
        body: formData,
      }
    );
    const data = await response.json();

    // Display alert
    alertRender({ type: data.type, message: data.message });

    // Display messages
    if (data.type === "succes") {
      navRender();
      // Send messages socket
      socket.emit("messages", data);
    }
  } catch {
    // Display Error
    alertRender({ message: "Erreur" });
  }
}

export async function handleSubmitUser(event: any, id: string) {
  event.preventDefault();

  // Cancels previous alerts
  alertRender({});
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
      },
    });

    const data = await response.json();

    alertRender({ type: data.type, message: data.message });

    // Display messages
    if (data.type === "succes") {
      navRender("Connexion");
      window.localStorage.removeItem("token");
      document.querySelector("messages-render")?.removeAttribute("data");
      document.querySelector("side-nav")?.removeAttribute("identify");
      // Send messages socket
      socket.emit("messages", data);
    }
  } catch {
    alertRender({ message: "Erreur" });
  }
}
