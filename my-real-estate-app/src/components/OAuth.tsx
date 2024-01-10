import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';

export const OAuth = () => {

const handleGoogleClick = async () => {
    try {

       

        const provider = new GoogleAuthProvider();
        const auth = getAuth(app)
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        
    } catch (error) {
        console.log('cannot sign in with googlwe')
        
    }

}


  return (
    <button onClick={handleGoogleClick} type="button" className="bg-red-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase">Continute with google</button>
  )
}
