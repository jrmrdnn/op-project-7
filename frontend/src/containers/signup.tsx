import { h, Fragment } from "preact";
import { useMemo, useState } from "preact/hooks";
import Button from "../components/button";
import Input from "../components/input";
import { handleSubmit } from "../functions/handleSubmit";

type LoginState = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
};

export default function Signup() {
  const [state, setState] = useState<LoginState>({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  });

  /// Field management
  function handleChange({ currentTarget }: any) {
    const { value, name } = currentTarget;
    setState({ ...state, [name]: value });
  }

  return (
    <Fragment>
      <form
        onSubmit={(e) => handleSubmit(e, state, "user/signup")}
        className="wapper-content"
      >
        <h1>Inscription</h1>
        <Input
          type="text"
          name="firstName"
          label="Prénom"
          value={state.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          label="Nom de famille"
          value={state.lastName}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          label="E-mail"
          value={state.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          label="Mot de passe"
          value={state.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" title="Envoyer" />
      </form>
    </Fragment>
  );
}
