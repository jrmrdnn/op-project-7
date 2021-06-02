import { h, FunctionComponent } from "preact";

type IconProps = {
  size?: string;
  color?: string;
};

export const IconCaretUp: FunctionComponent<IconProps> = ({
  size = "24",
  color = "#000",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={`fill:${color}`}
  >
    <path d="M5 15L19 15 12 7z"></path>
  </svg>
);

export const IconCaretDown: FunctionComponent<IconProps> = ({
  size = "24",
  color = "#000",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={`fill:${color}`}
  >
    <path d="M11.998 17L18.998 9 4.998 9z"></path>
  </svg>
);

export const IconConversation: FunctionComponent<IconProps> = ({
  size = "24",
  color = "#000",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={`fill:${color}`}
  >
    <path d="M16,14h0.5c0.827,0,1.5-0.673,1.5-1.5v-9C18,2.673,17.327,2,16.5,2h-13C2.673,2,2,2.673,2,3.5V13v1v4l5.333-4H13H16z M6.667,12L4,14v-1V4h12v8h-3H6.667z"></path>
    <path d="M20.5,8H20v2v2.586v1.415c0,1.1-0.893,1.993-1.99,1.999h-0.677H16h-5h-1H8v0.5C8,17.327,8.673,18,9.5,18H10h1h5h0.667 L22,22v-4v-1v-1.999v-2.002V9.5C22,8.673,21.327,8,20.5,8z"></path>
  </svg>
);

export const IconTrash: FunctionComponent<IconProps> = ({
  size = "24",
  color = "#000",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={`fill:${color}`}
  >
    <path
      fill="none"
      d="M17.004 20L17.003 8h-1-8-1v12H17.004zM13.003 10h2v8h-2V10zM9.003 10h2v8h-2V10zM9.003 4H15.003V6H9.003z"
    ></path>
    <path d="M5.003,20c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V8h2V6h-3h-1V4c0-1.103-0.897-2-2-2h-6c-1.103,0-2,0.897-2,2v2h-1h-3 v2h2V20z M9.003,4h6v2h-6V4z M8.003,8h8h1l0.001,12H7.003V8H8.003z"></path>
    <path d="M9.003 10H11.003V18H9.003zM13.003 10H15.003V18H13.003z"></path>
  </svg>
);

export const IconPencil: FunctionComponent<IconProps> = ({
  size = "24",
  color = "#000",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={`fill:${color}`}
  >
    <path
      fill="none"
      d="M16.589 9L15.003 7.414 5.906 16.511 5.377 18.625 7.491 18.097z"
    ></path>
    <path
      transform="rotate(134.999 18.003 6)"
      fill="none"
      d="M16.882 4.879H19.125V7.122H16.882z"
    ></path>
    <path d="M4.003,21c0.081,0,0.162-0.01,0.242-0.03l4-1c0.176-0.044,0.337-0.135,0.465-0.263L21.003,7.414 c0.378-0.378,0.586-0.88,0.586-1.414s-0.208-1.036-0.586-1.414L19.417,3c-0.756-0.756-2.072-0.756-2.828,0L4.296,15.293 c-0.128,0.128-0.219,0.289-0.263,0.464l-1,4c-0.086,0.341,0.015,0.701,0.263,0.95C3.485,20.897,3.741,21,4.003,21z M18.003,4.414 L19.589,6l-1.586,1.586L16.417,6L18.003,4.414z M5.906,16.511l9.097-9.097L16.589,9l-9.098,9.097l-2.114,0.528L5.906,16.511z"></path>
  </svg>
);

export const IconComment: FunctionComponent<IconProps> = ({
  size = "24",
  color = "#000",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={`fill:${color}`}
  >
    <path d="M7 7H17V9H7zM7 11H14V13H7z"></path>
    <path d="M20,2H4C2.897,2,2,2.897,2,4v18l5.333-4H20c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M20,16H6.667L4,18V4h16V16z"></path>
  </svg>
);

export const IconMenu: FunctionComponent<IconProps> = ({
  size = "24",
  color = "#000",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={`fill:${color}`}
  >
    <path d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z"></path>
  </svg>
);
