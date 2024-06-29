// import { createContext, useEffect, useState } from "react";
// import { auth } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState({});

//     useEffect(() => {
//         const unsub = onAuthStateChanged(auth, (user) => {
//             setCurrentUser(user);
//         });

//         return () => {
//             unsub();
//         };
//     }, []);

//     return (
//         <AuthContext.Provider value={{ currentUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [product, setProduct] = useState(null);
    console.log(currentUser)
    const updateUser = (data) => {
        setCurrentUser(data);
    };
    const updateProduct = (data) => {
        setProduct(data);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, updateUser, product, updateProduct }}>
            {children}
        </AuthContext.Provider>
    );
};