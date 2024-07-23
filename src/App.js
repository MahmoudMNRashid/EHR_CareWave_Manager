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
import { getRole, getToken, loaderForLogin, loaderForSaveRoutesWithExpForManager, loaderForSaveRoutesWithExpForManager_Assistant } from "./Util/Auth";
import { AllAssistants } from "./pages/Manager/AllAssistants";
import { DoctorSearchIdMedical } from "./pages/Manager/DoctorSearchIdMedical";
import { PatientSearchIdSyr } from "./pages/Manager/PatientSearchIdSyr";
import { Test } from "./pages/Asst_Manger/Test";
import { TestManager } from "./pages/Manager/TestManager";
import { ChangePassword } from "./pages/Asst_Manger/ChangePassword";
import { ChangePhoneAndPassword } from "./pages/Asst_Manger/ChangePhoneAndPassword";
import { AddNewDisease } from "./pages/Asst_Manger/AddNewDisease";
import { FindPatient } from "./pages/Manager/FindPatient";
import { api, MainDetailsInformationEHR } from "./pages/Manager/Main_Details_Information_EHR";
import { apiDetailsDiagnose, DetailsDiagnose } from "./pages/Manager/DetailsDiagnose";
import { Error } from "./pages/Login_Logout/Error";
import { AddNewSpecialization } from "./pages/Asst_Manger/AddNewSpecialization";


const router = createBrowserRouter([
  {
    path: '/', element: <LoginPage />, loader: loaderForLogin
  },
  {
    path: '/dashboardSysAdmin',
    element: <RootLayoutManager />,
    loader: loaderForSaveRoutesWithExpForManager,
    errorElement:<Error/>,
    children: [
      { path: 'NewAssistant', element: <NewAssistant />,loader:loaderForSaveRoutesWithExpForManager },
      { path: 'Assistants', element: <AllAssistants />,loader:loaderForSaveRoutesWithExpForManager },
      {
        path: 'Complaints',loader:loaderForSaveRoutesWithExpForManager, children: [

          { index: true, element: <Complaints />, },

        ]
      },
      {
        path: 'MedicalTips',loader:loaderForSaveRoutesWithExpForManager, children: [

          { index: true, element: <MedicalTips /> }

        ]
      },
      { path: 'DeleteAccountDoctor', element: <DeleteAccountDoctor />,loader:loaderForSaveRoutesWithExpForManager },

      { path: 'DoctorsSearchName', element: <DoctorsSearchName />,loader:loaderForSaveRoutesWithExpForManager },
      { path: 'DoctorSearchIdSyr', element: <DoctorSearchIdSyr />,loader:loaderForSaveRoutesWithExpForManager },
      { path: 'DoctorSearchIdMedical', element: <DoctorSearchIdMedical />,loader:loaderForSaveRoutesWithExpForManager },
      { path: 'PatientSearchIdSyr', element: <PatientSearchIdSyr /> },
      { path: 'Reports', element: <Reports />,loader:loaderForSaveRoutesWithExpForManager },
      { path: 'test', element: <TestManager />,loader:loaderForSaveRoutesWithExpForManager },
      {
        path: 'HealthRecord', loader: loaderForSaveRoutesWithExpForManager, children: [
          { index: true, element: <FindPatient /> },
          {
            path: ':IdSyr', loader: loaderForSaveRoutesWithExpForManager, children: [

              { index: true, element: <MainDetailsInformationEHR />, loader: api },
              { path: ':IdDiagnose', element: <DetailsDiagnose />, loader: apiDetailsDiagnose }
            ]
          },


        ]
      },

    ]
  },

  {
    path: '/dashboardAsst',
    element: <RootLayoutAsst />,
    loader:loaderForSaveRoutesWithExpForManager_Assistant,
    children: [
      { path: 'VerifyDoctorAccount', element: <VerifyDoctorAccount />,loader:loaderForSaveRoutesWithExpForManager_Assistant },
      { path: 'UpgradeAccount', element: <UpgradeAccount />,loader:loaderForSaveRoutesWithExpForManager_Assistant },
      { path: 'PatientSearchIdSyr', element: <PatientSearchIdSyr />,loader:loaderForSaveRoutesWithExpForManager_Assistant },
      { path: 'ChangePassword', element: <ChangePassword />,loader:loaderForSaveRoutesWithExpForManager_Assistant },
      { path: 'ChangePhoneAndPassword', element: <ChangePhoneAndPassword />,loader:loaderForSaveRoutesWithExpForManager_Assistant },
      { path: 'AddNewDisease', element: <AddNewDisease />,loader:loaderForSaveRoutesWithExpForManager_Assistant },
      { path: 'AddNewSpecialization', element: <AddNewSpecialization />,loader:loaderForSaveRoutesWithExpForManager_Assistant },
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
