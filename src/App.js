import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import "./App.css";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import TransactionsList from "./TransactionsList/TransactionsList";

function App() {
  const routes = createHashRouter([
    {
      path: "/",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <TransactionsList /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
