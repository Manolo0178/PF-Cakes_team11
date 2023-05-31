import React from "react";
// import { Link } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, CardTitle, Row, Col, Table} from "reactstrap";
import classNames from "classnames";
import { format } from "date-fns";
function Usuario(props) {
  let { userData, ordered, handleChange} = props
  return(
    <div>
       <Row>
          <Col lg="6" md="12">
          
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
                
                  <Button
                    tag="label"
                    className={classNames("btn-simple", {
                      active: ordered === "",
                    })}
                    id="0"
                    size="sm"
                    color={"info"}
                    onClick={() => handleChange('')}
                  >
                    Nombres
                  </Button>
                  <Button
                    tag="label"
                    className={classNames("btn-simple", {
                      active: ordered === "ASC",
                    })}
                    id="0"
                    size="sm"
                    color={"info"}
                    onClick={() => handleChange('ASC')}
                  >
                    Primer Nombre
                  </Button>
                  <Button
                    tag="label"
                    className={classNames("btn-simple", {
                      active: ordered === "DESC",
                    })}
                    id="0"
                    size="sm"
                    color={"info"}
                    onClick={() => handleChange('DESC')}
                  >
                    Ultimo Nombre
                  </Button>
                  <Button
                    tag="label"
                    className={classNames("btn-simple", {
                      active: ordered === "date",
                    })}
                    id="0"
                    size="sm"
                    color={"info"}
                    onClick={() => handleChange('date')}
                  >
                    Ultima Fecha
                  </Button>
  
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                 {/* sadasdasdsadsad */}
                  <thead className="text-primary">
                    <tr>
                    
                      <th>Name
                      </th>
                      <th>Apellido</th>
                      <th>Fecha</th>
                      <th>Ciudad</th>
                      
                      <th className="text-center">Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                 { userData?.map(user => {
                  let {name, lastName, createdAt, addresses, id} = user
                    return(
                      <tr key={id}>
                        <td>{name}</td>
                      
                        <td>{lastName}</td>
                        {/* </Link> */}
                        <td>{format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}</td>
                        {/* <td>{addresses?.map((addres, index) => <h6 key={index}>{addres.city}</h6>).join(", ")}</td> */}
                        <td>{addresses?.map((address, index) => address.city).join(", ")}</td>
                        <td className="text-center">{id}</td>
                      </tr>
                    ) 
                  })}
            
                     
                   
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
         
        </Row>
    </div>
  )
}


export default Usuario;