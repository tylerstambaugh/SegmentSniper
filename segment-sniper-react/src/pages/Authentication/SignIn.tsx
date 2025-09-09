import { SignIn } from '@clerk/react-router'
import { Col, Container } from 'react-bootstrap'


export default function SignInPage() {
    const SIGN_IN_REDIRECT = import.meta.env.VITE_CLERK_SIGN_IN_REDIRECT_URL;

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Col>
                <SignIn
                    path="/sign-in"
                    routing="path"
                    signInUrl="/sign-in"
                    forceRedirectUrl={SIGN_IN_REDIRECT}
                    withSignUp
                />

            </Col>
        </Container>
    )
}