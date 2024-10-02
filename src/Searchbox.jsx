
import "./Searchbox.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from "react";



export default function Searchbox() {

    let [city, setcity]=useState("");
    let [error,seterror]=useState("");
    let [weth,setweth]=useState({
        City:"",
        temp: "",
        humidity:"",
        temp_max:"",
        temp_min:""
    });



    let rain="https://images.unsplash.com/photo-1715501753129-f356b8b99fd5?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    let hot="https://images.unsplash.com/photo-1546274527-9327167dc1f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    let cold="https://images.pexels.com/photos/666737/pexels-photo-666737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";


    let api_key="2610d873f3aa9d298073f3c79291b7c9";



    async function Winfo(){
        try{
        let a= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
        let b=await a.json();

setweth({...weth,
    City:b.name,
    temp: b.main.temp,
    humidity: b.main.humidity,
    temp_max:b.main.temp_max,
    temp_min:b.main.temp_min
 })
     console.log(b);
     }

        catch{
             seterror("No such place found");
        }
    };

    function abc(event){
        setcity(event.target.value);
        
    };

    function xyz(event){
      event.preventDefault();
      console.log(city);
     setcity("");
     seterror("");
       Winfo();
    };

    return(

   
     

<div
      id="main"
      style={{
        backgroundImage: weth.temp > 15 ? `url(${hot})` :
                         (weth.temp <= 15&&weth.temp>=5) ? `url(${rain})` :
                         weth.temp < 5 ? `url(${cold})` :
                         null,
        backgroundSize: 'cover'
      }}
    >

    <div className="sbox">

    <h3>Search for the weather</h3>
    <form onSubmit={xyz}>
    <TextField id="city" label="City-name" variant="standard" value={city} onChange={abc}/>
    <br></br>
    <br></br>
    <Button variant="contained" type="submit">Search</Button> 

    <br></br>
    <br></br>

    </form>

    </div>


   <p style={{color: "red"}}>{error}</p>


    <div className="Winfo">
        
  
    <Card sx={{ maxWidth: 345 }} id="card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={weth.temp>15 ? hot : (weth.temp<=15&&weth.temp>=5) ? rain : weth.temp<5 ? cold: null}
          alt="weth_img"/>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Weather
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           <b style={{color:"black"}}>{weth.City}</b>
            <br />
   <br />

  Temprature - {weth.temp}&deg;C
   <br />
   <br />

    Humidity-  {weth.humidity}
    <br />
   <br />

    Temp_max-  {weth.temp_max}
    <br />
   <br />

    Temp_min-  {weth.temp_min}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>


    </div>
   

    </div>
)
}