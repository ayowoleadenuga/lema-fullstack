import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UsersTable } from "./components/UsersTable";
import { UserPosts } from "./components/UsersPosts";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen p-8">
          <Routes>
            <Route path="/" element={<UsersTable />} />
            <Route path="/users/:userId" element={<UserPosts />} />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
