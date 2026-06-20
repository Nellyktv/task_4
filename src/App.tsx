import { Route, Routes } from 'react-router-dom'
import { routes } from './routes/AppRoutes'

const App = () => {
  return (
      <Routes>
        {routes.map((el) => (
            <Route key={el.path} path={el.path} element={el.element}/>
        ))}
      </Routes>
  )
}

export default App