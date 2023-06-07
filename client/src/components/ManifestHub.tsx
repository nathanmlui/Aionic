import { Outlet, useLocation } from 'react-router';
import ManifestList from './ManifestList';
import ManifestDetails from './ManifestDetails';


function ManifestHub() {
  const location = useLocation();
  console.log('this is location: ',location.state) 

  return (
    <div>
      <ManifestList />
      <h1>This is manifest hub</h1>
    </div>
  );
}

export default ManifestHub;
