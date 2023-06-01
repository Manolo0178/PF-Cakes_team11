const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [street, setStreet] = useState("");
const [postalCode, setPostalCode] = useState("");
const [city, setCity] = useState("");
const [province, setProvince] = useState("");
const [number, setNumber] = useState("");
const [telephoneContact, setTelephoneContact] = useState("");
const [addressId, setAddressId] = useState("");
const [userId, setUserId] = useState("");
const [image, setImage] = useState("");

// ...

async function handleUpdateUser() {
const idUser = userId;
const userData = {
  username: username,
  email: email,
  firstName: firstName,
  lastName: lastName,
  image: image,
  // ...
};
