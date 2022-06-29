import React, {useState} from "react";
import './App.css';
import Viewer from "./Components/Viewer";
import axios from "axios";

function App() {

  const options = [
    { value: "author", label: "Author"},
    { value: "title", label: "Title"},
    { value: "lines", label: "Lines"}
  ]

  const [search, setSearch] = useState("")
  const [option, setOption] = useState("")
  const [poemData, setPoemData] = useState([])

  const handleChange = (event) => {
    setOption(event.target.value)
  }

  const searchPoem= (event) => {
    if(event.key==="Enter")
    {
      axios.get("https://poetrydb.org/"+option+"/"+search+"/all")
      .then(res=>setPoemData(res.data))
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else if (err.request) {
          console.log(err.request)
        } else {
          console.log('Error', err.message)
        }
      })
    }
  }

  return (
    <>
      <div className="header">
        <h1 className="webHeader">Poem Finder</h1>
        <img className="img" src="./images/book.svg" alt="Reading a book" />
        {/* <h2>Enter your query!</h2> */}
        <div className="search">
          <input id="search-bar" type="text" placeholder="Enter keyword here" value={search} onChange={e=>setSearch(e.target.value)}
          onKeyPress={searchPoem}/>
        </div>
        <div className="searchOptions">
          <label htmlFor="options">Search by:</label>
          <select name="options" id="options" value={option} onChange={handleChange} required>
           {options.map((option) =>
            <option key={option.value} value={option.value}>
             {option.label}
            </option>
           )}
          </select>
        </div>
      </div>

      <div className="container">
        {
          <Viewer poem={poemData}/>
        }
      </div>
    </>
  );
}

export default App;
