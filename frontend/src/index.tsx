import register from "preact-custom-element";
//import "preact/debug";
import SideNav from "./elements/side-nav";
import Messages from "./elements/messages-render";
import Alert from "./elements/alert-render";
import Info from "./elements/info-render";
import "./style/app.scss";
import "./style/header.scss";
import "./style/wrapper.scss";

register(SideNav, "side-nav", ["active", "identify"]);
register(Messages, "messages-render", ["render", "data"]);
register(Alert, "alert-render", ["type", "message"]);
register(Info, "info-render", ["title", "content"]);
