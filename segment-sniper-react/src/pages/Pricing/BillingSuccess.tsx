import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Button } from 'react-bootstrap';
import { AppRoutes } from '../../enums/AppRoutes';
import { useNavigate } from 'react-router';

export default function BillingSuccess() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded) {
      user?.reload();
    }
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Subscription Updated 🚀</h1>
      <Button
        onClick={() => navigate(`/${AppRoutes.Dashboard}`)}
        variant="primary"
        className="mt-3"
      >
        Main Menu
      </Button>
    </div>
  );
}
