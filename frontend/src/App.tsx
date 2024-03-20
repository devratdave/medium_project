import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Home } from "./pages/Home"
import { Blog } from "./pages/Blog"
import { Publish } from "./pages/Publish"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path={`/blog/:id`} element={<Blog />} />
        <Route path={'/publish'} element={<Publish />} />
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
