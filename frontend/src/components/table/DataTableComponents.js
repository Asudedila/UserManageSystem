import React, { useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/mdc-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';  
import 'primeicons/primeicons.css';

export default  function DataTableComponent (props ) {
  
    const { data, columns, title ,onRowSelect } = props;
    const [selectedUser, setSelectedUser] = useState(null);

    const onSelectionChange=(e)=>{
      setSelectedUser(e.value || false);
      onRowSelect(e.value || false);
    }

    const filteredData = data.filter(data=>data.deleted!=="1");

    return(
      <div style={{ width: '1100px'}}>
      <h1>{title} </h1>
      
        <DataTable  resizableColumns  value={filteredData} showGridlines paginator rows={10} selection={selectedUser} onSelectionChange={onSelectionChange}  >
        <Column selectionMode="single" ></Column>
            {columns.map(col => (
                <Column  key={col.field} field={col.field} header={col.header} headerStyle={{ backgroundColor: "#b3bfb3"}} sortable    />
            ))}
        </DataTable>
      </div>)
  };

