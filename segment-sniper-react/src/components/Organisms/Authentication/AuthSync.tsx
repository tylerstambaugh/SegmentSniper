import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import useGetMeQuery from "../../../hooks/Api/User/useGetMe";
import { AppRoutes } from "../../../enums/AppRoutes";
import { Col, Container, Spinner } from "react-bootstrap";

export const AuthSync = ({ children }: { children: React.ReactNode }) => {
    const { user, isSignedIn } = useUser();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    // Call your backend to check if user has Strava refresh token
    const { data, isLoading, isError, error } = useGetMeQuery();

    useEffect(() => {
        if (!isSignedIn || isLoading) return;

        if (isError) {
            // If API rejects (e.g., 401), send user to a "Not Authorized" route
            navigate(AppRoutes.Unauthorized);
            setChecked(true);
            return;
        }

        if (data?.refreshToken) {
            navigate(AppRoutes.Dashboard);
        } else {
            navigate(AppRoutes.ConnectWithStrava);
        }

        setChecked(true);
    }, [isSignedIn, isLoading, isError, data, navigate]);

    if (!checked || isLoading) {
        return (
            <Container className="d-flex flex-column justify-content-center">
                <Col>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            </Container>
        );
    }

    return <>{children}</>;
};