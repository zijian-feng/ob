import Register from '@/pages/Register/register'
import { createHashRouter, redirect } from 'react-router'

export const router = createHashRouter([
  {
    path: '/',
    element: <>Hello world!</>,
    loader: async () => {
      // 判断是否已经登录
      const isLogin = false
      if (!isLogin) {
        return redirect('/register')
      }
    }
  },
  {
    path: '/register',
    element: <Register />
  }
])
