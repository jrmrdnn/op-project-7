import { h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import Button from "../components/button";
import Input from "../components/input";
import { verifFileTypes } from "../functions";
import { handleSubmitMessage } from "../functions/handleSubmit";
import { alertRender, RecupMessage } from "../functions/render";

type CreateMessageState = {
  type?: "create" | "update";
};

type StateCreateMessage = {
  id: string | null;
  title: string;
  content: string;
  file: any;
  imgUrl: any;
};

export default function CreateMessage({ type = "create" }: CreateMessageState) {
  const [title, setTitle] = useState<string>("Rédiger votre message");
  const [state, setState] = useState<StateCreateMessage>({
    id: null,
    title: "",
    content: "",
    file: null,
    imgUrl: null,
  });

  const fileInput: any = useRef();

  useEffect(() => {
    if (type === "update") {
      setState(RecupMessage());
      setTitle("Modifier le message");
    } else setTitle("Rédiger votre message");
  }, [type]);

  // Field management
  function handleChange({ currentTarget }: any) {
    const { value, name } = currentTarget;
    setState({ ...state, [name]: value.trim() });
  }

  // File management
  function handleChangeFile({ target }: any) {
    const file = target.files[0];
    const extension = file.name.split(".").pop().toLowerCase();

    if (verifFileTypes(extension)) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setState({ ...state, file, imgUrl: reader.result });
      };

      reader.readAsDataURL(file);
    } else {
      alertRender({ message: "Le fichier n'est pas accepté" });
    }
  }

  return (
    <Fragment>
      <form
        className="wapper-content"
        onSubmit={(e) => handleSubmitMessage(e, state)}
      >
        <h1>{title}</h1>
        <Input
          type="text"
          name="title"
          label="Titre :"
          value={state.title}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
          ref={fileInput}
          onChange={handleChangeFile}
          style={{ display: "none" }}
        />

        {state.imgUrl && state.imgUrl !== "null" ? (
          <div
            className="preview"
            onClick={() => setState({ ...state, file: null, imgUrl: null })}
          >
            <img src={state.imgUrl} alt="" />
          </div>
        ) : (
          <div
            className="drop-files"
            onClick={() => {
              fileInput.current.click();
              alertRender({});
            }}
          >
            <p>
              Choisissez votre image
              <br />
              (Optionnel)
            </p>
          </div>
        )}
        <Input
          type="textarea"
          name="content"
          label="Contenu :"
          value={state.content}
          onChange={handleChange}
        />
        <Button type="submit" title="Envoyer" />
      </form>
    </Fragment>
  );
}
