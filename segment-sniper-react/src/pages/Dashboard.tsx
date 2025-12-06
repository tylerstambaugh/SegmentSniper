import { Container } from 'react-bootstrap';

import MainMenu from '../components/Organisms/MainMenu/MainMenu';

export default function Dashboard() {
  return (
    <>
      <Container className="d-flex flex-column justify-content-center">
        <MainMenu />
      </Container>
    </>
  );
}
