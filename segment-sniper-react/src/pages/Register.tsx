import { Container } from "react-bootstrap";
import RegisterWidget from "../components/RegisterWidget";

function Register() {
  return (
    <div>
      <h1>This is the register page</h1>
      <Container>
        <RegisterWidget />
      </Container>
    </div>
  );
}

export default Register;
