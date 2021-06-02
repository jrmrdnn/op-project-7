import { Fragment, h } from "preact";
//import "./style.scss";

export default function Users({ users, usersConnect }: any) {
  return (
    <Fragment>
      <h1>Utilisateurs</h1>
      <h2>En ligne :</h2>
      {usersConnect?.map((u: any) => (
        <p>- {u.username}</p>
      ))}
      <h2>Liste des utilisateurs :</h2>
      {users?.map((u: any) => (
        <p>- {u.username}</p>
      ))}
    </Fragment>
  );
}
