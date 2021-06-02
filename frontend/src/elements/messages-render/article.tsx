import { Fragment, h } from "preact";
import { useLayoutEffect, useState } from "preact/hooks";
import Comment from "../../containers/comment";
import Button from "../../components/button";
import Input from "../../components/input";
import {
  IconCaretUp,
  IconCaretDown,
  IconComment,
  IconPencil,
  IconTrash,
} from "../../components/svg";
import { alertRender, messageRender } from "../../functions/render";
import socket from "../../functions/socket";
import "./style.scss";

type LikeProps = {
  like: boolean;
  noLike: boolean;
};

type ArticleProps = {
  id: string;
  user: { id: string; username: string };
  userId: string;
  admin: boolean;
  date: string;
  likes: [];
  comments: [];
  title: string;
  image?: string;
  text: string;
  deleteArticle: any;
};

export default function Article({
  id,
  user,
  userId,
  admin,
  date,
  likes,
  comments,
  title,
  image,
  text,
  deleteArticle,
}: ArticleProps) {
  const [comment, setcomment] = useState<any>(comments);
  const [state, setState] = useState<string>("");
  const [command, setCommand] = useState<boolean>(false);
  const [vote, setVote] = useState<number>(0);
  const [like, setLike] = useState<LikeProps>({
    like: false,
    noLike: false,
  });

  useLayoutEffect(() => {
    let total: number = 0;
    likes.forEach((val: any) => {
      if (val.userId === userId) {
        if (val.like === 1) setLike({ like: true, noLike: false });
        if (val.like === 0) setLike({ like: false, noLike: false });
        if (val.like === -1) setLike({ like: false, noLike: true });
      }
      total += val.like;
    });
    setVote(total);
  }, []);

  async function handleSubmit(num: number) {
    const originalVote = vote;
    const originalLike = like;
    alertRender({});
    try {
      const response = await fetch(`/api/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          like: num,
        }),
      });

      const data = await response.json();

      alertRender({ type: data.type, message: data.message });

      if (data.type === "error") {
        setVote(originalVote);
        setLike(originalLike);
      }
      // Send messages socket
      if (data.type === "succes") socket.emit("messages", data);
    } catch {
      alertRender({ message: "Erreur" });
    }
  }

  async function handleSubmitComment() {
    alertRender({});
    if (state.length > 3) {
      try {
        const response = await fetch(`/api/comment/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${
              window.localStorage.getItem("token") || ""
            }`,
          },
          body: JSON.stringify({ content: state }),
        });

        const data = await response.json();

        alertRender({ type: data.type, message: data.message });

        if (data.type === "succes") {
          setcomment([
            ...comment,
            { user: { username: user.username }, content: state },
          ]);
          setState("");
          socket.emit("messages", data);
        }
      } catch {
        alertRender({ message: "Erreur" });
      }
    } else {
      alertRender({ message: "Le commentaire est trop court" });
    }
  }

  function likeCallback() {
    if (like.like === false) {
      if (like.noLike === true) {
        setLike({ ...like, noLike: false });
        setVote(vote + 1);
        handleSubmit(0);
      } else {
        setLike({ ...like, like: true });
        setVote(vote + 1);
        handleSubmit(1);
      }
    }
  }

  function noLikeCallback() {
    if (like.noLike === false) {
      if (like.like === true) {
        setLike({ ...like, like: false });
        setVote(vote - 1);
        handleSubmit(0);
      } else {
        setLike({ ...like, noLike: true });
        setVote(vote - 1);
        handleSubmit(-1);
      }
    }
  }

  return (
    <article>
      <div className="article-vote">
        <div onClick={likeCallback} title="Like +">
          <IconCaretUp color={like.like === true ? "#1FA564" : "#000"} />
        </div>
        <span>{vote}</span>
        <div onClick={noLikeCallback} title="Like -">
          <IconCaretDown color={like.noLike === true ? "#DD2419" : "#000"} />
        </div>
      </div>
      <div>
        <div className="article-header">
          <a>{user.username}</a>
          <span>{date}</span>
        </div>
        <h2>{title}</h2>
        {image && <img src={image} />}
        <p>{text}</p>
        {command ? (
          <Fragment>
            <Comment data={comment} />
            <Input
              type="textarea"
              name="commentaire"
              label="Ajouté votre commentaire :"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <div className="btn-group">
              <Button title="Envoyer" onClick={handleSubmitComment} />
              <Button
                title="fermer"
                onClick={() => setCommand(false)}
                style="danger"
              />
            </div>
          </Fragment>
        ) : (
          <div className="btn-group">
            <Button
              title={`${comment.length} Commentaire${
                comment.length > 1 ? "s" : ""
              }`}
              onClick={() => setCommand(true)}
              icon={<IconComment color="#fff" size="12" />}
            />
            {(user.id === userId || admin) && (
              <Fragment>
                <Button
                  title="Modifier"
                  onClick={() => {
                    document
                      .querySelector("side-nav")
                      ?.setAttribute("active", "Rédaction");
                    messageRender({
                      render: "Modification",
                      state: {
                        id,
                        title,
                        image,
                        text,
                      },
                    });
                  }}
                  style="succes"
                  icon={<IconPencil color="#fff" size="12" />}
                />
                <Button
                  title="Supprimer"
                  onClick={() => {
                    alertRender({});
                    deleteArticle(id);
                  }}
                  style="danger"
                  icon={<IconTrash color="#fff" size="12" />}
                />
              </Fragment>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
