import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/Manager/LoginPage";
import { RootLayoutManager } from "./pages/Manager/RootLayoutManager";
import { NewAssistant } from "./pages/Manager/NewAssistant";
import { Complaints } from "./pages/Manager/Complaints";
import { MedicalTips } from "./pages/Manager/MedicalTips";
import { Reports } from "./pages/Manager/Reports";
import { DoctorSearchIdSyr } from "./pages/Manager/DoctorSearchIdSyr";
import { DoctorsSearchName } from "./pages/Manager/DoctorsSearchName";
import { AddTips } from "./pages/Manager/AddTips";
import { RootLayoutAsst } from "./pages/Asst_Manger/RootLayoutAsst";
import { VerifyDoctorAccount } from "./pages/Asst_Manger/VerifyDoctorAccount";
import {ChangePass} from './pages/Asst_Manger/ChangePass';
import { UpgradeAccount } from "./pages/Asst_Manger/UpgradeAccount";
import {DeleteDoctorAccount} from './pages/Asst_Manger/DeleteDoctorAccount'


const router = createBrowserRouter([
  {
    path: '/', element: <LoginPage />
  },
  {
    path: '/dashboardSysAdmin',
    element: <RootLayoutManager />,
    children: [
      { path: 'NewAssistant', element: <NewAssistant /> },
      { path: 'Complaints', element: <Complaints /> },
      {
        path: 'MedicalTips', children: [

          { index:true, element: <MedicalTips />, }
          , { path: 'AddTips', element: <AddTips /> }]
      },

      { path: 'DoctorsSearchName', element: <DoctorsSearchName /> },
      { path: 'DoctorSearchIdSyr', element: <DoctorSearchIdSyr /> },
      { path: 'Reports', element: <Reports /> },


    ]
  },

  {
    path: '/dashboardAsst',
    element: <RootLayoutAsst />,
    children: [
      { path: 'VerifyDoctorAccount', element: <VerifyDoctorAccount/> },
      { path: 'UpgradeAccount', element: <UpgradeAccount/> },
      { path: 'DeleteDoctorAccount', element: <DeleteDoctorAccount/> },
      { path: 'ChangePass', element: <ChangePass /> },


    ]
  }

])

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
