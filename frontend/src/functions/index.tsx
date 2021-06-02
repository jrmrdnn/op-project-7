import jwtDecode from "jwt-decode";
import { useEffect, useState } from "preact/hooks";
import { navRender } from "./render";
import socket from "./socket";

/**
 * Checks and extracts data JWT
 */
export function verifAuth() {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { exp, userId, admin }: any = jwtDecode(token);
      if (exp * 1000 > new Date().getTime()) {
        return { userId, admin };
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch {
    window.localStorage.removeItem("token");
    return false;
  }
}

/**
 * Checks types file
 */
export function logout() {
  window.localStorage.removeItem("token");
  document.querySelector("side-nav")?.removeAttribute("identify");
  document.querySelector("messages-render")?.removeAttribute("data");
  navRender("Connexion");
  socket.disconnect();
}

/**
 * Checks types file
 */
export function verifFileTypes(extension: string) {
  const fileTypes: string[] = ["jpg", "jpeg", "png", "gif", "webp"];
  if (fileTypes.indexOf(extension) > -1) return true;
  else return false;
}

// Get the viewport width & height
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
