import { h, Fragment } from "preact";
import Button from "../components/button";
import { logout } from "../functions";
import { handleSubmitUser } from "../functions/handleSubmit";

export default function Logout({ id }: { id: string }) {
  return (
    <Fragment>
      <h1>Compte</h1>
      <div className="wapper-logout">
        <Button title="Se déconnecter" onClick={() => logout()} />
        <Button
          title="Supprimer le compte"
          style="danger"
          onClick={(e) => handleSubmitUser(e, id)}
        />
      </div>
    </Fragment>
  );
}
