import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./style.scss";

export default function Alert({ type, message }: any) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (type && message) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    const time = window.setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(time);
  }, [type, message]);

  if (visible === true) {
    return (
      <div className={`alert ${type}`}>
        <p>{message}</p>
      </div>
    );
  } else {
    return;
  }
}
