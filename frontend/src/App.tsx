import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/Home/Home";
import Registration from "./pages/Register/Registration";
import Root from "./pages/Root";
import SuspensenItems from "./pages/SuspenseItems/SuspensenItems";
import User from "./pages/User/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SuspensenItems>
        <Root />
      </SuspensenItems>
    ),
    errorElement: (
      <SuspensenItems>
        <ErrorPage />
      </SuspensenItems>
    ),
    children: [
      {
        path: "",
        element: (
          <SuspensenItems>
            <Home />
          </SuspensenItems>
        ),
      },
      {
        path: "signup",
        element: (
          <SuspensenItems>
            <Registration />
          </SuspensenItems>
        ),
      },
      {
        path: "signup/:id",
        element: (
          <SuspensenItems>
            <User />
          </SuspensenItems>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
