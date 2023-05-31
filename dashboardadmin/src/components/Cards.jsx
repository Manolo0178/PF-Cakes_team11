// import React, { useEffect } from "react";
// import { allUser } from "../redux/actions.js";
// import { useDispatch, useSelector } from "react-redux";
// import Dashboard from "views/Dashboard.js";
// function Cards() {
//   const dispatch = useDispatch();
//   const userData = useSelector(state => state.userData)
//   console.log(userData);

//   useEffect(() => {
//    dispatch(allUser())
//   }, [dispatch])

//   return(
//     <div>
//       {
//         userData?.map(user => {
//           console.log(userData);
//           let {id, name} = user
//          return (
//           <Dashboard
//             key={id}
//             name={name}
//             // create={createdAt}
//           />
          
//         )})
//       }
    
//     </div>
//   )
// }


// export default Cards;