import LogoutWidget from "../../components/Organisms/Authentication/LogoutWidget/LogoutWidget";

function Logout({ inactive }: { inactive: boolean }) {
  return (
    <>
      <LogoutWidget inactive={inactive} />
    </>
  );
}

export default Logout;
