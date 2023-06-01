// let lista  = [
//     {
//       "id": 1,
//       "userId": 1,
//       "deleted": false,
//       "createdAt": "2023-05-30T00:33:44.211Z",
//       "updatedAt": "2023-05-30T00:33:44.211Z",
//       "user": {
//         "id": 1,
//         "name": "horacio",
//         "lastName": "cano",
//         "email": "h@gmail.com",
//         "contact": "111111",
//         "role": "user",
//         "created": true,
//         "deleted": false,
//         "createdAt": "2023-05-30T00:32:28.847Z",
//         "updatedAt": "2023-05-30T00:32:28.847Z",
//         "addresses": []
//       },
//       "products": [
//         {
//           "id": 12,
//           "name": "Arrollado Patagonico",
//           "image": "https://res.cloudinary.com/dvntckop9/image/upload/v1684435030/ArrolladoPatagonico_ic0ymz.png",
//           "price": 2800,
//           "created": true,
//           "deleted": false,
//           "createdAt": "2023-05-30T00:30:56.768Z",
//           "updatedAt": "2023-05-30T00:30:56.768Z",
//           "orderItem": {
//             "quantity": 1
//           }
//         }
//       ]
//     },
//     {
//       "id": 2,
//       "userId": 3,
//       "deleted": false,
//       "createdAt": "2023-05-30T00:34:11.200Z",
//       "updatedAt": "2023-05-30T00:34:11.200Z",
//       "user": {
//         "id": 3,
//         "name": "Juan",
//         "lastName": "baez",
//         "email": "juann@gmail.com",
//         "contact": "111111",
//         "role": "user",
//         "created": true,
//         "deleted": false,
//         "createdAt": "2023-05-30T00:33:02.429Z",
//         "updatedAt": "2023-05-30T00:33:02.429Z",
//         "addresses": []
//       },
//       "products": [
//         {
//           "id": 12,
//           "name": "Arrollado Patagonico",
//           "image": "https://res.cloudinary.com/dvntckop9/image/upload/v1684435030/ArrolladoPatagonico_ic0ymz.png",
//           "price": 2800,
//           "created": true,
//           "deleted": false,
//           "createdAt": "2023-05-30T00:30:56.768Z",
//           "updatedAt": "2023-05-30T00:30:56.768Z",
//           "orderItem": {
//             "quantity": 1
//           }
//         },
//         {
//           "id": 15,
//           "name": "Cupcakes (por docena)",
//           "image": "https://res.cloudinary.com/dvntckop9/image/upload/v1684435035/CupcakesSuculentas_oxgwjw.png",
//           "price": 2000,
//           "created": true,
//           "deleted": false,
//           "createdAt": "2023-05-30T00:30:56.813Z",
//           "updatedAt": "2023-05-30T00:30:56.813Z",
//           "orderItem": {
//             "quantity": 1
//           }
//         }
//       ]
//     }
//   ]


//  const nuevo =  lista.products.map(product => product.name)

//   console.log(nuevo);


<Col className="px-md-1" md="3">
<FormGroup>
  <label>Nombre de Usuario</label>
  <Input
    defaultValue={username}
    placeholder="Nombre de Usuario"
    type="text"
    onChange={(e) => setUsername(e.target.value)}
  />
</FormGroup>
</Col>