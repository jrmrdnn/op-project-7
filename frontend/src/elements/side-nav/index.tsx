import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { messageRender, navRender } from "../../functions/render";
import { IconMenu } from "../../components/svg";
import useWindowDimensions from "../../functions";
import "./style.scss";

export default function SideNav({ active, identify }: any) {
  const isIdentify: string[] = [
    "Messages",
    "Rédaction",
    "Utilisateurs",
    "Compte",
  ];

  const NoIdentify: string[] = ["Connexion", "Inscription"];

  const [state, setState] = useState<string[] | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    messageRender({ render: active });
  }, [active]);

  useEffect(() => {
    if (identify) setState(isIdentify);
    else setState(NoIdentify);
  }, [identify]);

  function RenderMenu(array: string[] | null) {
    return array?.map((menu: string, i: number) => {
      const classSideMenu: string[] = ["side-menu"];
      if (menu === active) classSideMenu.push("side-menu-active");
      return (
        <li key={i}>
          <a
            className={classSideMenu.join(" ")}
            onClick={() => {
              navRender(menu);
              setVisible(false);
            }}
          >
            <div className="side-menu-title">{menu}</div>
          </a>
        </li>
      );
    });
  }

  return (
    <Fragment>
      <div className="menu-mobile" onClick={() => setVisible(!visible)}>
        <IconMenu size="50" color="#fff" />
      </div>
      <nav className={visible && width < 880 ? "visible" : ""}>
        <ul>{RenderMenu(state)}</ul>
      </nav>
    </Fragment>
  );
}
