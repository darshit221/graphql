import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { QUERY_ALL_USER } from "./DisplayData";

const CREATE_USER = gql`
  mutation createUser($inputdata: createUserInput!) {
    CreateUser(input: $inputdata) {
      name
      id
      age
      username
      nationality
    }
  }
`;

function MutateData() {
  const initialValues = {
    name: "",
    username: "",
    age: " ",
    nationality: " ",
  };
  const [userInput, setuserInput] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInput({ ...userInput, [name]: value });
    console.log(userInput);
  };

  const { refetch } = useQuery(QUERY_ALL_USER);

  const [fetchuserData] = useMutation(CREATE_USER);

  const handleData = () => {
    fetchuserData({
      variables: {
        inputdata: {
          name: userInput.name,
          username: userInput.username,
          age: (userInput.age = 21),
          nationality: userInput.nationality.toUpperCase(),
        },
      },
    });
    refetch();
  };
  return (
    <div>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={userInput.name}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        placeholder="username"
        name="username"
        value={userInput.username}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="number"
        placeholder="age"
        name="age"
        value={userInput.age}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        placeholder="nationality"
        name="nationality"
        value={userInput.nationality}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={() => handleData()}>create user</button>
    </div>
  );
}

export default MutateData;
