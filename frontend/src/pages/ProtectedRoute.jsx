import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { fetchSession } from "../../utils/fetchSession";
import { useUserStore } from "../../store/useUserStore";
import { LoadingSpinner } from "../components/Misc/LoadingSpinner";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, profileId, setUser } = useUserStore();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("🔄 Checking session...");
        const response = await fetchSession();

        // ✅ Debugging to ensure state updates correctly
        console.log("✅ Response received in ProtectedRoute:", response);

        setUser(response);
      } catch (error) {
        console.error("❌ Error verifying session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [setUser]);

  // ✅ Log state changes for debugging
  useEffect(() => {
    console.log("📊 Current State: ", { isAuthenticated, profileId });
  }, [isAuthenticated, profileId]);

  // ✅ If still loading, show spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }


  return isAuthenticated ? children : <Navigate to="/login" replace />;

};
