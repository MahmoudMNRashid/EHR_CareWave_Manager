import { createBrowserRouter, redirect, RouterProvider, useNavigate } from "react-router-dom";
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
import { getVerifyDoctorAccount, VerifyDoctorAccount } from "./pages/Asst_Manger/VerifyDoctorAccount";
import {ChangeNumber} from './pages/Asst_Manger/ChangeNumber';
import { UpgradeAccount } from "./pages/Asst_Manger/UpgradeAccount";
import { DeleteAccountDoctor } from "./pages/Manager/DeleteAccountDoctor";
import { fetchAllTips  } from "./pages/Manager/MedicalTips";
import { fetchAllComplaints } from "./pages/Manager/Complaints";
import { EditTip } from "./pages/Manager/EditTip";
import { ModalForConfirmDeleteAllComplaintsOrOne } from "./components/Manager/ModalForConfirmDeleteAllComplaintsOrOne";
import { action as logoutAction } from "./pages/Logout";
import { getRole, getToken } from "./Util/Auth";


const router = createBrowserRouter([
  {
    path: '/', element: <LoginPage />, loader:()=>{
      if(getToken() && getRole()!=="_"){
         if(getRole()==="5")
        return redirect('/dashboardSysAdmin')
        else if(getRole()==="6"){
          return redirect('/dashboardAsst')
        }else{
          return null
        }
      }
      else{
        return null
      }
    }
  },
  {
    path: '/dashboardSysAdmin',
    element: <RootLayoutManager />,
    children: [
      { path: 'NewAssistant', element: <NewAssistant /> },
      { path: 'Complaints', children:[

        {index:true,element: <Complaints />,  loader:fetchAllComplaints},
        {path:`DeleteComplaint's'/:data`,element:<ModalForConfirmDeleteAllComplaintsOrOne/>}
      ]},
      {
        path: 'MedicalTips', children: [

          { index:true, element: <MedicalTips />, loader:fetchAllTips }
          , { path: 'AddTips', element: <AddTips /> },
          { path:"EditTip/:data",element:<EditTip/>}
        ]
      },
      { path: 'DeleteAccountDoctor', element: <DeleteAccountDoctor /> },

      { path: 'DoctorsSearchName', element: <DoctorsSearchName  />},
      { path: 'DoctorSearchIdSyr', element: <DoctorSearchIdSyr /> },
      { path: 'Reports', element: <Reports /> },


    ]
  },

  {
    path: '/dashboardAsst',
    element: <RootLayoutAsst />,
    children: [
      { path: 'VerifyDoctorAccount', element: <VerifyDoctorAccount/>,loader:getVerifyDoctorAccount },
      { path: 'UpgradeAccount', element: <UpgradeAccount/> },
      { path: 'ChangeNumber', element: <ChangeNumber /> },


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
