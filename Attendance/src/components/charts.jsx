import React, { useEffect, useState } from "react";

const branches = ["CSE","ECE","EEE","MECH","CIVIL","IT"];

const Charts = () => {

//   const [data,setData] = useState([]);

//   useEffect(()=>{

//     fetch("http://localhost:8000/api/dept-attendance")
//     .then(res=>res.json())
//     .then(result=>{

//       // convert API result to object
//       const map = {};
//       result.forEach(d=>{
//         map[d._id] = d.total;
//       });

//       // ensure all branches exist
//       const finalData = branches.map(branch=>({
//         department: branch,
//         total: map[branch] || 0
//       }));

//       setData(finalData);

//     });

//   },[]);

//   const total = data.reduce((sum,item)=> sum + item.total ,0);

//   const radius = 120;
//   const center = 150;

//   let startAngle = 0;

//   const colors = [
//     "#FF6384",
//     "#36A2EB",
//     "#FFCE56",
//     "#4CAF50",
//     "#9966FF",
//     "#FF9F40"
//   ];

//   const createSlice = (value,index) => {

//     const percent = total === 0 ? 0 : value/total;
//     const sliceAngle = percent * 360;

//     const startRad = (Math.PI/180) * startAngle;
//     const endRad = (Math.PI/180) * (startAngle + sliceAngle);

//     const x1 = center + radius * Math.cos(startRad);
//     const y1 = center + radius * Math.sin(startRad);

//     const x2 = center + radius * Math.cos(endRad);
//     const y2 = center + radius * Math.sin(endRad);

//     const largeArc = sliceAngle > 180 ? 1 : 0;

//     const path = `
//       M ${center} ${center}
//       L ${x1} ${y1}
//       A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
//       Z
//     `;

//     startAngle += sliceAngle;

//     return (
//       <path
//         key={index}
//         d={path}
//         fill={colors[index]}
//       />
//     );
//   };

  return (

    <div className="bg-white rounded-xl shadow p-5" style={{display:"flex",gap:"40px"}}>
        <h2 className="text-xl p-20 pl-60 ">📊 Attendance Chart</h2>
            

{/* 
      <svg width="300" height="300">
        {data.map((item,index)=>createSlice(item.total,index))}
      </svg>

      <div>
        <h3>Department Attendance</h3>

        {data.map((item,index)=>{

          const percent = total === 0 ? 0 :
          ((item.total/total)*100).toFixed(1);

          return(

            <div key={index} style={{marginBottom:"8px"}}>

              <span
              style={{
                width:"15px",
                height:"15px",
                background:colors[index],
                display:"inline-block",
                marginRight:"10px"
              }}
              ></span>

              {item.department} : {percent}%

            </div>

          );

        })}

      </div> */}

    </div> 

  );

};

export default Charts;