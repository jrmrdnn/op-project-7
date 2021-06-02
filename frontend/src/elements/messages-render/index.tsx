import { h, Fragment } from "preact";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "preact/hooks";
import Article from "./article";
import CreateMessage from "../../containers/createMessage";
import Login from "../../containers/login";
import Logout from "../../containers/logout";
import Signup from "../../containers/signup";
import Users from "../../containers/users";
import { verifAuth } from "../../functions";
import { alertRender, navRender } from "../../functions/render";
import socket from "../../functions/socket";
import "./style.scss";

export default function Messages({ render, data }: any) {
  const [state, setState] = useState<any>(null);
  const [load, setLoad] = useState<boolean>(true);
  const [users, setUsers] = useState<any>(null);
  const [socketMessage, setSocketMessage] = useState<any>(null);
  const [usersConnect, setUsersConnect] = useState<any>(null);

  const user: any = verifAuth();

  useLayoutEffect(() => {
    socket.on("users.list", ({ users }: any) => {
      setUsersConnect(users);
    });

    socket.on("users.leave", ({ user }: any) => {
      const target: any = [];
      if (usersConnect)
        usersConnect.forEach((u: any) => {
          if (u.id !== user.id) {
            target.push(u);
          }
        });
      setUsersConnect(target);
    });

    socket.on("messages.list", (messages: any) => {
      setSocketMessage(messages);
    });

    socket.on("likes.list", (likes: any) => {
      setSocketMessage(likes);
    });

    socket.on("comments.list", (comments: any) => {
      setSocketMessage(comments);
    });
  }, [usersConnect]);

  useEffect(() => {
    if (user) {
      fetch("/api/message", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
        .then((response) =>
          response.json().then((data) => {
            setState(data.data);
            setLoad(false);
            navRender("Messages", true);
          })
        )
        .catch(() => {
          window.localStorage.removeItem("token");
          alertRender({ type: "error", message: "Vous n'êtes pas connecté" });
        });
    }
  }, [data, socketMessage]);

  useEffect(() => {
    if (user) {
      fetch("/api/user", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }).then((response) =>
        response.json().then((data) => {
          setUsers(data.data);
        })
      );
    }
  }, [data, socketMessage]);

  async function deleteArticle(id: string) {
    const originalArticles = [...state];
    setState(state.filter((data: any) => data.id !== id));
    try {
      const response = await fetch(`/api/message/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
        },
      });

      const data = await response.json();

      alertRender({ type: data.type, message: data.message });

      // Send messages socket
      if (data.type === "succes") socket.emit("messages", data);

      if (data.type === "error") setState(originalArticles);
    } catch {
      alertRender({ message: "Erreur" });
    }
  }

  const Articles = useCallback(() => {
    return (
      <Fragment>
        <h1>Bienvenu sur le réseau sociaux Groupomania</h1>
        {load && <p>Veuillez patienter ....</p>}
        {state?.map((data: any, key: number) => (
          <Article
            key={key}
            id={data.id}
            user={data.user}
            userId={user.userId}
            admin={user.admin}
            date={data.createdAt.slice(0, 10)}
            likes={data.likes}
            comments={data.comments}
            title={data.title}
            image={data.imageUrl}
            text={data.content}
            deleteArticle={deleteArticle}
          />
        ))}
      </Fragment>
    );
  }, [state]);

  switch (render) {
    case "Connexion":
      return !user ? <Login /> : <Logout id={user.userId} />;
    case "Inscription":
      return !user ? <Signup /> : <Logout id={user.userId} />;
    case "Compte":
      return !user ? <Login /> : <Logout id={user.userId} />;
    case "Rédaction":
      return user ? <CreateMessage /> : <Login />;
    case "Modification":
      return user ? <CreateMessage type="update" /> : <Login />;
    case "Utilisateurs":
      return user ? (
        <Users usersConnect={usersConnect} users={users} />
      ) : (
        <Login />
      );
    default:
      return user ? <Articles /> : <Login />;
  }
}
