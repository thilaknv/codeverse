import { AuthProps } from "../../helpers/types";
import { useAuth } from "../components/Auth";

const Profile = () => {
  const { USER } = useAuth() as AuthProps;
  console.log("profile");
  return <div>Profile</div>;
};

export default Profile;
