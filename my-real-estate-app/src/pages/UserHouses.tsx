import { useParams } from "react-router-dom";

export const UserHouses = () => {
 


  const { email } = useParams();

  console.log('id from the user houses component', email)

  return (
    <div>

      User userEmail: {email}
    

    </div>
  );
};