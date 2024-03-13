import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableOne from '../Tables/TableOne';
// import TableThree from '../components/Tables/TableThree';
// import TableTwo from '../components/Tables/TableTwo';
// import DefaultLayout from '../layout/DefaultLayout';
import DefaultLayoutAdmin from "../layaout/DefaultLayoutAdmin";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const Tables = () => {
    const navigate = useNavigate();

  return (
    <DefaultLayoutAdmin>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayoutAdmin>
  );
};

export default Tables;
