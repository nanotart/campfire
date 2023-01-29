import React from "react";
import { useAuth } from "../hooks/useAuth";

function UnauthenticatedApp() {
  const { login } = useAuth();

  return (
    <div>
      <div>
        <button onClick={login} className="login">Login with Google</button>
      </div>
    </div>
  );
}

export { UnauthenticatedApp };
