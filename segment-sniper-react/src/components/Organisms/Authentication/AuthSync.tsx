import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import useGetMeQuery from "../../../hooks/Api/User/useGetMe";

export const AuthSync = ({ children }: { children: React.ReactNode }) => {
    const { user, isSignedIn } = useUser();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    // Call your backend to check if user has Strava refresh token
    const { data, isLoading } = useGetMeQuery();

    useEffect(() => {
        if (!isSignedIn || isLoading) return;

        if (data?.refreshToken) {
            navigate("/dashboard");
        } else {
            navigate("/connect-strava");
        }

        setChecked(true);
    }, [isSignedIn, isLoading, data, navigate]);

    if (!checked || isLoading) {
        return <div>Loading...</div>; // you can use a spinner
    }

    return <>{children}</>;
};
