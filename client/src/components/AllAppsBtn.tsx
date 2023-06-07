import { useNavigate } from "react-router";

export default function AllAppsBtn() {

    const navigate = useNavigate();

    const handleBack = (e) => {
      e.preventDefault();
      navigate('/home');
    };

    return (
        <>
          <button
            className='rounded-md bg-slate-100 hover:bg-slate-200 px-4 py-2'
            onClick={(e) => handleBack(e)}
          >
            ⬅️ All apps
          </button>
        </>
    )
}