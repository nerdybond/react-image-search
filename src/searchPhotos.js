import React, {useEffect, useState} from "react";
import {createClient} from "pexels";
import axios from "axios";

export default function SearchPhotos(){
    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    
    // Pexel API Variables - Used to change amount of photos per page and current page.
    let per_page = 50;
    let page_no = 1;
    
    //Pexel API Auth Token
    const access_token = '563492ad6f91700001000001e17ed42f6299475a8c05cc7de890c490';  

    //useEffect - Run searchPhotos with curated photos on page load.
    //React.useEffect(() => searchPhotos((e) => setQuery(e.target.value)),[])
    
    // ASync function created by clicking 'Search' button
    const searchPhotos = async (e) => {
        e.preventDefault();
        let url;
        if (query.trim().length==0)
        {                 
            url = "https://api.pexels.com/v1/curated?page=" + page_no + "&per_page=" + per_page;
        } else {
            url = "https://api.pexels.com/v1/search?query=" + query + "&per_page=" + per_page;
        }
        
    // Pexel API Authorisation
        axios.get(url, {  
            headers: {  
                'Authorization': `${access_token}`  
            }  
        }).then(data => {    
            setPics(data.data.photos);
        })  
    };


return (
<div>
<form className = "form" onSubmit= {searchPhotos} >
    <label className = "label" htmlFor="query">
        {" "}
    </label>
    <input
    type= "text"
    name = "query"
    className = "input"
    placeholder = {"TO-DO: Replace with a dynamic placeholder of jokes"}
    value={query}
    onChange = {(e) => setQuery(e.target.value)}
    onSubmit = {searchPhotos}
/>
<button type = "submit" className = "button">Search</button>
</form>

<div className = "card-list" >
{
pics.map((pic) => <div className = "card" key={pic.id}> 
    <img
        className = "card-image"
        alt = {pic.alt}
        src = {pic.src.large}
        width = "50%"
        height = "50%" >
    </img>
</div>
)}
</div>
</div>
);
}