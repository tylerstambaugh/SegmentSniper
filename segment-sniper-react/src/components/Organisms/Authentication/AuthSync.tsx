import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import useGetMeQuery from "../../../hooks/Api/User/useGetMe";
import { AppRoutes } from "../../../enums/AppRoutes";
import { Col, Container, Row, Spinner } from "react-bootstrap";


export const AuthSync = ({ children }: { children: React.ReactNode }) => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const { data, isLoading, isError } = useGetMeQuery({
        enabled: isSignedIn,
    });

    useEffect(() => {

        if (!isSignedIn) {
            setChecked(true);
            return;
        }

        if (isLoading) return;

        if (isError) {
            navigate(AppRoutes.Unauthorized);
            setChecked(true);
            return;
        }

        if (data?.stravaRefreshToken === null) {
            if (location.pathname !== AppRoutes.ConnectWithStrava) {
                navigate(AppRoutes.ConnectWithStrava, { replace: true });
            }
        }

        setChecked(true);
    }, [isSignedIn, isLoading, isError, data, navigate]);

    if (isSignedIn && (!checked || isLoading)) {
        return (
            <Container className="d-flex flex-column justify-content-center">
                <Row>
                    <Col>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            </Container>
        );
    }

    return <>{children}</>;
};
