import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Home } from "./pages/Home"
import { Blog } from "./pages/Blog"
import { Publish } from "./pages/Publish"
import { Account } from "./pages/Account"
import { EditUserBlog } from "./pages/EditUserBlog"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/"} element={<Signin />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={`/blog/:id`} element={<Blog />} />
        <Route path={`/editblog/:id`} element={<EditUserBlog />} />
        <Route path={'/publish'} element={<Publish />} />
        <Route path={'/account'} element={<Account />} />
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
