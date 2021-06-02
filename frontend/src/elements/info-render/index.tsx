import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import socket from "../../functions/socket";

export default function Info() {
  const [visible, setVisible] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    socket.on("users.new", ({ user }: any) => {
      setVisible(true);
      setUser(user.username + " vient de se connecter");
    });

    socket.on("users.leave", ({ user }: any) => {
      setVisible(true);
      setUser(user.username + " vient de se déconnecter");
    });
  }, []);

  useEffect(() => {
    const time = window.setTimeout(() => setVisible(false), 5000);
    return () => {
      clearTimeout(time);
      socket.on("disconnect");
    };
  }, [visible]);

  if (visible === true) {
    return (
      <div className="alert">
        <p>{user}</p>
      </div>
    );
  } else {
    return;
  }
}
