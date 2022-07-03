import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../models/user'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext<AuthContextData | null>(null)

type AuthContextData = ReturnType<typeof useProviderAuth>

export const useProviderAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      setUser(user)
    }
  }, [])

  const signIn = async ({ email, password }: User) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}users/login`,
        {
          email,
          password,
        },
        config
      )
      setLoading(false)
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      navigate('/')
    } catch (error: any) {
        console.log(error)
        setLoading(false)
        setError(error.response.data.message)
    }
  }

  const signUp = async ({ name, email, password }: User) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}users/register`,
        {
          name,
          email,
          password,
        },
        config
      )
      setLoading(false)
      navigate('/login')
    } catch (error: any) { 
      console.log(error)
      setLoading(false)
      setError(error.response.data.message) 
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('user')
  }
  return { user, loading, error, signIn, signUp, signOut }
}

export const AuthProvider: React.FC = ({ children }) => {
  const value = useProviderAuth()

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error('useAuth needs to be used inside AuthContext')
  }

  return auth
}


















// import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios'

// type ContextProviderProps = {
//   children: React.ReactNode
// }

// const AuthContext = React.createContext({})

// export const AuthProvider: React.FC = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       ; (async () => {
//         try {
//           const { data } = await axios.get('/boards', {
//             headers: {
//               authorization: `Bearer ${token}`,
//             },
//           })
//           setUser(data)
//         } catch (e) {
//           console.log(e)
//         }
//       })()
//     }
//   }, [])

//   const signIn = async (email: string, password: string) => {
//     const url = `${process.env.REACT_APP_API_URL}users/login`
//     const config = {
//       headers: {
//         'Content-type': 'application/json',
//       },
//     }
//     try {
//       const { data } = await axios.post(
//         url,
//         {
//           email,
//           password,
//         },
//         config
//       )
//       setUser(data)
//       localStorage.setItem('token', data.token)
//     } catch (error: any) { console.log(error) }
//   }

//   const signUp = async (name: string, email: string, password: string) => {
//     const url = `${process.env.REACT_APP_API_URL}users`
//     const config = {
//       headers: {
//         'Content-type': 'application/json',
//       },
//     }
//     try {
//       const { data: res } = await axios.post(
//         url,
//         {
//           name,
//           email,
//           password,
//         },
//         config
//       )
//       console.log(res.message)
//     } catch (error: any) {
//       console.log(error)
//     }
//   }

//   const signOut = () => {
//     setUser(null)
//     localStorage.removeItem('token')
//   }

//   return (
//     <AuthContext.Provider value={{ user, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const auth = useContext(AuthContext)

//   if (!auth) {
//     throw Error('useAuth needs to be used inside AuthContext')
//   }

//   return auth
// }