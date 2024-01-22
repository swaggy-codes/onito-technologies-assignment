// import React from "react";

// const HomeTwo = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

//   const dispatch = useDispatch();

//   const formDetails = useSelector((state) => state.formData);
//   const userDataList = useSelector((state) => state.userDataList);
//   const handleChange = (e) => {
//     console.log(e.target.name, "inside the handlechange");
//     setFormData((v) => ({ ...v, [e.target.name]: e.target.value }));
//   };

//   // saving and going to next page...
//   const handleSaveToFormReduxState = () => {
//     dispatch(formDetailsActions.storeFormData(formData));
//   };

//   // Final submit to reflect in the table
//   const handleSaveToReduxStateUserList = () => {
//     dispatch(userDataListingActions.storeUserDataList(formData));
//   };
//   return (
//     <div>
//       <input
//         name='name'
//         type='text'
//         placeholder='Enter Name'
//         onChange={(e) => {
//           handleChange(e);
//         }}
//       />
//       <input
//         name='email'
//         type='email'
//         placeholder='Enter Email'
//         onChange={(e) => {
//           handleChange(e);
//         }}
//       />
//       <input
//         name='phone'
//         type='number'
//         placeholder='Enter Number'
//         onChange={(e) => {
//           handleChange(e);
//         }}
//       />
//       <button type='button' onClick={() => handleSaveToFormReduxState()}>
//         save to form details
//       </button>
//       <button type='button' onClick={() => handleSaveToReduxStateUserList()}>
//         save to redux user list
//       </button>

//       {userDataList?.userDataList?.length > 0 &&
//         userDataList?.userDataList?.map((el, i) => {
//           console.log(el, "this is the map");
//           return (
//             <>
//               <div>{el?.name}</div>
//               <div>{el?.address}</div>
//               <div>{el?.phone}</div>
//               <hr />
//             </>
//           );
//         })}
//     </div>
//   );
// };

// export default HomeTwo;
