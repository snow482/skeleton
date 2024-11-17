import { Outlet } from "react-router-dom";
import Nav from "./nav/Nav";

export default function Layout({ user, setUser}) {
  return (
    <>
      <Nav user={user} setUser={setUser} />
      <section>
        <Outlet/>
      </section>
    </>
  )
}
