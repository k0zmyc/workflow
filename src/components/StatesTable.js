import { StatesTableRow } from "./StatesTableRow"

/**
 * List of members as a table
 * @param {*} param0 
 * @returns 
 */
export const StatesTableComponent = ({state, actions}) => {
    //console.log(group.memberships)
    return (
        <table className="table table-hover table-stripped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Jméno</th>
                    <th>Příjmení</th>
                    <th>Email</th>
                    <th>Nástroje</th>
                </tr>
            </thead>
            <tbody>
                {/* {state?.memberships?.map(
                    (m, index) => <StatesTableRow key={m.user.id} user={m.user} index={index + 1} actions={actions} gid={group.id}/>
                )} */}
            </tbody>
        </table>
    )
}





















// import { DeleteButton } from "./DeleteButton";

// const TableComponent = (props) => {
//   console.log("TableComponent loaded")  
//   return (
//         <table className="table table-hover table-light">
//             <thead className="table-primary">
//                 <tr>
//                     <th>Name</th>
//                     <th>Last change</th>
//                     <th>Amount</th>
//                     <th>Type of finance</th>
//                     <th></th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {props.finance.map((finance) => <FinanceRow key={finance.id} index={finance.id}
//                                                         name={finance.name}
//                                                         change={finance.change}
//                                                         amount={finance.amount}                                                      
//                                                         type={finance.type}  />)} 
//             </tbody>
//             {/* <tbody>
//               <tr>
//                 <td>id</td>
//                 <td>name</td>
//                 <td>last change</td>
//                 <td>source</td>
//                 <td>destination</td>
//               </tr>
//             </tbody> */}
//         </table>
//     )
// }

// const FinanceRow = ({ index, name, change, amount, type,}) =>{

//     const rowColor = amount < 0 ? 'table-danger' : 'table-success';

//     return (
//     <tr className={rowColor}>
//         <td>{name}</td>
//         <td>{change}</td>
//         <td>{amount} CZK</td>
//         <td>{type} </td>
//         <td><DeleteButton financeId={index} /></td>
//     </tr>
//     )
// }

// export default TableComponent;

















// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { fetchData } from '../actions/actions.js';

// const TableComponent = ({ data, error, fetchData }) => {
//   console.log("TableComponent called");
//   useEffect(() => {
//     fetchData(); // Fetch the data when the component mounts
//   }, [fetchData]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   const workflowPage = data.workflowPage[0];
//   const transitions = workflowPage.transitions;

//   return (

//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Last Change</th>
//           <th>Source</th>
//           <th>Destination</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>id</td>
//           <td>name</td>
//           <td>last change</td>
//           <td>source</td>
//           <td>destination</td>
//         </tr>
//       </tbody>
//     </table>



    
//     // <table>
//     //   <thead>
//     //     <tr>
//     //       <th>ID</th>
//     //       <th>Name</th>
//     //       <th>Last Change</th>
//     //       <th>Source</th>
//     //       <th>Destination</th>
//     //     </tr>
//     //   </thead>
//     //   <tbody>
//     //     {transitions.map((transition) => (
//     //       <tr key={transition.id}>
//     //         <td>{transition.id}</td>
//     //         <td>{transition.name}</td>
//     //         <td>{transition.lastchange}</td>
//     //         <td>{transition.source.name}</td>
//     //         <td>{transition.destination.name}</td>
//     //       </tr>
//     //     ))}
//     //   </tbody>
//     // </table>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     data: state.data,
//     error: state.error,
//   };
// };

// export default connect(mapStateToProps, { fetchData })(TableComponent);