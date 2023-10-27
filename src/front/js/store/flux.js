import { useNavigate } from "react-router-dom";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      currentUser: null,
      email: "",
      password: "",
      rep_password: "",
      alert: {
        show: false,
        text: "",
      },
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      tokenForLogin2: () => {
        const token = sessionStorage.getItem("token");
        console.log("Token para login");
        if (token && token != "" && token != undefined) {
          setStore({ token: token });
        }
      },
      logOut2: () => {
        sessionStorage.removeItem("token");
        console.log("Login out");
        setStore({ token: null });
      },

      login2: async (email, password) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch("http://127.0.0.1:3001/api/login", options);
          if (resp.status !== 200) {
            alert("Error");
            return false;
          }
          const data = await resp.json();
          console.log("backend", data);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });

          return true;
        } catch (error) {
          console.log.error("Error de login");
        }
      },

      //---- funcion para  login  de usuario------------------------------------------->
      Login: async (e, navigate) => {
        e.preventDefault();
        try {
          const { email, password, currentUser } = getStore();
          let info = { email, password, currentUser };
          const response = await fetch("http://127.0.0.1:3001/api/login", {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            const data = await response.json();
            setStore({ currentUser: data });
            sessionStorage.setItem("currentUser", JSON.stringify(data));
            navigate("/");
          } else {
            alert("Error");
          }
        } catch (error) {
          console.log(error);
          console.log("Error en el inicio de sesión");
          alert("Error");
        }
      },

      inputLogin: (e) => {
        setStore({
          [e.target.name]: e.target.value,
        });
      },
      checkUser: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: JSON.parse(sessionStorage.getItem("currentUser")),
          });
        }
      },
      logOut: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: null,
          });
          sessionStorage.removeItem("currentUser");
        }
      },
      inputUserValue: (e) => {
        const { name, value } = e.target;
        setStore({
          ...getStore(),
          [name]: value,
        });
      },
      submitUserImage: (e, navigate) => {
        try {
          e.preventDefault();
          const { email, password, rep_password } = getStore();
          const formData = new FormData();
          if (getStore().password === getStore().rep_password) {
            formData.append("email", email);
            formData.append("password", password);
            formData.append("rep_password", rep_password);
            getActions().postUser(formData, navigate);
            setStore({
              email: "",
              password: "",
              rep_password: "",
            });
            e.target.reset();
            console.log("SUBMIT USER REGISTER");
          } else {
            alert("las contraseñas no coinciden");
          }
        } catch (error) {
          console.log(error);
        }
      },
      postUser: async (formData, navigate) => {
        try {
          const { url } = getStore();
          const response = await fetch("http://127.0.0.1:3001/api/register", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.text())
            .then((result) => {
              navigate("/login");
              console.log(result);
            })
            .catch((error) => alert(error));
        } catch (error) {
          console.log(error);
        }
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
