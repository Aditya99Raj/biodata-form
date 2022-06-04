

import axios from "axios";
import { useEffect, useState } from "react";
import "./Forms.css";
import "bootstrap/dist/css/bootstrap.min.css";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from "react-bootstrap-table-next";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

export const Forms = ()=>{

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        city:"",
        state:"",
        country:"",
    })
    const[data,setData] = useState([]);
    const columns=[
         {dataField:"id",text: "Id"},
        {dataField: "name",text: "Name" , sort:true   },
        {dataField:"email",text: "Email"  },
        {dataField: "city",text: "City" ,filter:textFilter() , sort:true },
        {dataField: "state",text: "State" ,filter:textFilter() , sort:true },
        {dataField: "country",text: "Country" ,filter:textFilter() , sort:true },
      
    ]
     useEffect(()=>{
        showData()
     },[])
    const handleChange = (e)=>{
       // e.preventDefault();
        const {id,value} = e.target;

        setFormData({
            ...formData,
            [id]:value
        })
    }

    const showData=()=>{
        axios.get(`http://localhost:3004/users`).then((res)=>{
            setData(res.data)
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:3004/users",formData).then((res)=>{
       console.log("res",res)
        }).then((res)=>{
            showData()
        })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h3>Form</h3>
                <label >Name</label>
                <input id="name" type="text" placeholder="Name" onChange={handleChange} />

                <label >Email</label>
                <input id="email" type="text" placeholder="Email" onChange={handleChange} />

                <label >City</label>
                <input id="city" type="text" placeholder="City" onChange={handleChange} />

                <label >State</label>
                <input  id="state"type="text" placeholder="State" onChange={handleChange} />

                <label>Country</label>
                <input id="country" type="text" placeholder="Country" onChange={handleChange} />

                <input type="submit" placeholder="Submit" />
            </form>

            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th><select>
                            <option></option>
                            <option></option>
                            <option></option>
                            </select></th>
                        <th>State</th>
                        <th>Country</th>
                    </tr>
                </thead>
                {data.map((el) => (
                    <tbody>
                        <tr>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.city}</td>
                            <td>{el.state}</td>
                            <td>{el.country}</td>
                        </tr>
                    </tbody>
                ))}
            </table> */}
          <BootstrapTable bootstrap4 keyField="id" columns={columns} data={data}  hover={true} striped={true} filter={filterFactory()}  />
        </div>
    )
}
export default Forms