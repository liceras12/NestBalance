// logout.js
import { getAuth, signOut } from "firebase/auth";

const logout = (navigation) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Redirigir al login
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
};

export default logout;
