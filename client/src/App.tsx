import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomeLayout,
  Register,
  Login,
  ErrorPage,
  LandingPage,
  DashboardLayout,
  MyRecipes,
  RecipeCardComponent,
} from "./utils";

import ProtectRoutes from "./utils/ProtectRoutes";

import { action as registerAction } from "./pages/authPages/Register";
import { action as loginAction } from "./pages/authPages/Login";
import { loader as getRecipesLoader } from "./pages/dashboardPages/MyRecipes";
import { loader as getSingleRecipeLoader } from "./components/RecipeCardComponent";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
          index: true,
        },
        {
          path: "register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            {
              path: "myRecipes",
              element: (
                <ProtectRoutes>
                  <MyRecipes />
                </ProtectRoutes>
              ),
              loader: getRecipesLoader,
            },
            {
              path: "recipe/:id",
              element: (
                <ProtectRoutes>
                  <RecipeCardComponent />
                </ProtectRoutes>
              ),
              loader: getSingleRecipeLoader,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
