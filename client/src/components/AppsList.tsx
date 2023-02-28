import { useNavigate } from "react-router";
import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { GitUserContext } from "./Protected";


function AppsList() {

  interface dbObj {
    name: string,
    uid: string
  }

  interface Data {
    [key: string]: dbObj;
  }


  
  const [appList, setAppList] = useState({});
  const [apps, setApps] = useState([]);
  const appListRef = useRef({})
  let navigate = useNavigate();
  const gitUser = useContext(GitUserContext);
 
  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      let appName = e.target.parentNode.childNodes[0].innerText;
      navigate('/home/manifests', { state: { query: appListRef.curr[appName]} });
  }

  //grab the app lists and display
  useEffect((): void => {
    const appsArr: any = [];

      //add username here not in parent
    fetch('server/api/apps?' + new URLSearchParams({
      user: gitUser
    }))
      .then((data: Response) => data.json())
      .then((data) => {
        //they are objects with two elements, name and uid
        const stateObj: Data  = {};
        for (const app of data) {
          stateObj[app.name] = app;
          stateObj[app.name].repo = app.source.repoURL;
          appsArr.push(
            <div>
              <h2 className="text-center text-3xl ">{`${app.name}`}</h2>
              <button onClick={(e) => handleClick(e)}>Click for details</button>
            </div>
          )
        }
        setAppList(stateObj);
        setApps(appsArr);
      })
    .catch((err)=>console.log('error occured fetching apps: ',))
  }, [])

  useEffect(() => {
    appListRef.curr = appList;
  },[appList])

  
  return (
    <div>
      <section className="flex gap-16">
        {apps}
      </section>
    </div>
  )
}


export default AppsList