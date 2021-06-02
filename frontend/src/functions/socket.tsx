declare let io: any;

const socket = io({
  auth: {
    token: window.localStorage.getItem("token") || "",
  },
});

export default socket;
