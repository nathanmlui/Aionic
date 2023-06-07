import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ManifestDetails from './ManifestDetails';
import AllAppsBtn from './AllAppsBtn'

function ManifestList() {
  const navigate = useNavigate();

  //grab all the data from backend
  const [mlList, setMlList] = useState([]);
  const [detail, setDetail] = useState(false);
  const [manifests, setManifests] = useState([]);
  const [sha, setSha] = useState('');
  const { state } = useLocation();

  useEffect(() => {
    const stateArr: any = [];
    console.log('uid is: ', state.query.uid);
    fetch(
      '/server/api/manifests?' +
        new URLSearchParams({
          uid: state.query.uid,
        })
    )
      .then((data: Response) => data.json())
      .then((data: any) => {
        console.log('data for this app is: ', data);
        for (const el of data) {
          stateArr.push(
            <div className='border flex flex-row place-content-between bg-white hover:bg-orange-50 hover:cursor-pointer drop-shadow rounded-md max-w-screen-sm m-2 p-7'>
              <div className='flex flex-col'>
                <h2 className='text-lg'>Git sha:</h2>
                <span className='font-mono text-rose-700 bg-slate-100 px-2 rounded'>
                  {el.revision}
                </span>
              </div>
              <button
                className='rounded-md bg-orange-500 hover:bg-orange-600 px-3 py-1 text-white text-sm'
                onClick={(e) => handleClick(e)}
              >
                View manifests
              </button>
            </div>
          );
        }
        setMlList(stateArr);
        setManifests(data);
      });
  }, []);

  //handle the click for the see more

  const handleClick = (e) => {
    e.preventDefault();
    const gitSha = e.target.parentNode.childNodes[0].childNodes[1].innerText;
    setDetail(true);
    setSha(gitSha);
  };

  //conditional return for displaying the details

  if (!detail) {
    return (
      <div>
        <AllAppsBtn/>
        {mlList}
      </div>
    );
  } else {
    return (
      <>
        <AllAppsBtn/>
        {mlList}
        <ManifestDetails details={manifests} setDetail={setDetail} sha={sha} />
      </>
    );
  }
}

export default ManifestList;
