import { useContext } from 'react'
import AuthContext from 'src/components/context/JWTAuthContext'

const useAuth = () => useContext(AuthContext)

export default useAuth
