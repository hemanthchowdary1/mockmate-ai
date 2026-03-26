import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("mockmate_user");
    return saved ? JSON.parse(saved) : null;
  });

  const signup = useCallback(({ username, email, password }) => {
    const users = JSON.parse(localStorage.getItem("mockmate_users") || "[]");
    
    // The '?' prevents crashes if old test accounts without usernames exist
    const exists = users.find((u) => u.username?.toLowerCase() === username.toLowerCase());
    if (exists) throw new Error("Username is already taken!");

    const newUser = { id: Date.now(), username, email, password };
    users.push(newUser);
    localStorage.setItem("mockmate_users", JSON.stringify(users));

    const { password: _, ...safeUser } = newUser;
    localStorage.setItem("mockmate_user", JSON.stringify(safeUser));
    setCurrentUser(safeUser);
  }, []);

  const login = useCallback(({ username, password }) => {
    const users = JSON.parse(localStorage.getItem("mockmate_users") || "[]");
    
    // The '?' here prevents crashes on login too
    const user = users.find((u) => u.username?.toLowerCase() === username.toLowerCase() && u.password === password);
    if (!user) throw new Error("Invalid username or password!");

    const { password: _, ...safeUser } = user;
    localStorage.setItem("mockmate_user", JSON.stringify(safeUser));
    setCurrentUser(safeUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("mockmate_user");
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);