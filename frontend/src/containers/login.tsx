import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import Button from "../components/button";
import Input from "../components/input";
import { handleSubmit } from "../functions/handleSubmit";

type LoginState = {
  email: string;
  password: string;
};

export default function Login() {
  const [state, setState] = useState<LoginState>({
    email: "",
    password: "",
  });

  // Field management
  function handleChange({ currentTarget }: any) {
    const { value, name } = currentTarget;
    setState({ ...state, [name]: value });
  }

  return (
    <Fragment>
      <form
        onSubmit={(e) => handleSubmit(e, state, "user/login")}
        className="wapper-content"
      >
        <h1>Connexion</h1>
        <Input
          type="email"
          name="email"
          label="E-mail"
          placeholder="user@groupomania.com"
          value={state.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          label="Mot de passe"
          placeholder="password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" title="Envoyer" />
      </form>
    </Fragment>
  );
}
