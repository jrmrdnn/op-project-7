import { Fragment, h } from "preact";
import "./style.scss";

export default function Comment({ data }: any) {
  return (
    <Fragment>
      <div className="comment">
        {data.map((value: any) => (
          <Fragment>
            <div className="comment-author">{value.user.username}</div>
            <p>{value.content}</p>
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
}
