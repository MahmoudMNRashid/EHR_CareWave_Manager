import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/Login_Logout/LoginPage";
import { RootLayoutManager } from "./pages/Manager/RootLayoutManager";
import { NewAssistant } from "./pages/Manager/NewAssistant";
import { Complaints } from "./pages/Manager/Complaints";
import { MedicalTips } from "./pages/Manager/MedicalTips";
import { Reports } from "./pages/Manager/Reports";
import { DoctorSearchIdSyr } from "./pages/Manager/DoctorSearchIdSyr";
import { DoctorsSearchName } from "./pages/Manager/DoctorsSearchName";
import { RootLayoutAsst } from "./pages/Asst_Manger/RootLayoutAsst";
import {  VerifyDoctorAccount } from "./pages/Asst_Manger/VerifyDoctorAccount";
import { UpgradeAccount } from "./pages/Asst_Manger/UpgradeAccount";
import { DeleteAccountDoctor } from "./pages/Manager/DeleteAccountDoctor";
import { action as logoutAction } from "./pages/Login_Logout/Logout";
import { getRole, getToken } from "./Util/Auth";
import { AllAssistants } from "./pages/Manager/AllAssistants";
import { DoctorSearchIdMedical } from "./pages/Manager/DoctorSearchIdMedical";
import { PatientSearchIdSyr } from "./pages/Manager/PatientSearchIdSyr";
import { Test } from "./pages/Asst_Manger/Test";
import { ChangePassword } from "./pages/Asst_Manger/ChangePassword";
import { ChangePhoneAndPassword } from "./pages/Asst_Manger/ChangePhoneAndPassword";
import { AddNewDisease } from "./pages/Asst_Manger/AddNewDisease";


const router = createBrowserRouter([
  {
    path: '/', element: <LoginPage />, loader: () => {
      if (getToken() && getRole() !== "") {
        if (getRole() === "5")
          return redirect('/dashboardSysAdmin')
        else if (getRole() === "6") {
          return redirect('/dashboardAsst')
        } else {
          return null
        }
      }
      else {
        return null
      }
    }
  },
  {
    path: '/dashboardSysAdmin',
    element: <RootLayoutManager />,
    loader: () => {
      const token = getToken();

      if (!token) {
        return redirect('/');
      } else {
        return null
      }

    },
    children: [
      { path: 'NewAssistant', element: <NewAssistant /> },
      { path: 'Assistants', element: <AllAssistants /> },
      {
        path: 'Complaints', children: [

          { index: true, element: <Complaints />, },

        ]
      },
      {
        path: 'MedicalTips', children: [

          { index: true, element: <MedicalTips /> }

        ]
      },
      { path: 'DeleteAccountDoctor', element: <DeleteAccountDoctor /> },

      { path: 'DoctorsSearchName', element: <DoctorsSearchName /> },
      { path: 'DoctorSearchIdSyr', element: <DoctorSearchIdSyr /> },
      { path: 'DoctorSearchIdMedical', element: <DoctorSearchIdMedical /> },
      { path: 'PatientSearchIdSyr', element: <PatientSearchIdSyr /> },
      { path: 'Reports', element: <Reports /> },


    ]
  },

  {
    path: '/dashboardAsst',
    element: <RootLayoutAsst />,
    children: [
      { path: 'VerifyDoctorAccount', element: <VerifyDoctorAccount /> },
      { path: 'UpgradeAccount', element: <UpgradeAccount /> },
      { path: 'PatientSearchIdSyr', element: <PatientSearchIdSyr /> },
      { path: 'ChangePassword', element: <ChangePassword /> },
      { path: 'ChangePhoneAndPassword', element: <ChangePhoneAndPassword /> },
      { path: 'AddNewDisease', element: <AddNewDisease /> },
      { path: 'test', element: <Test /> }


    ]
  },
  {
    path: 'logout',
    loader: logoutAction,
  },

])

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
