import React, { useState } from 'react'
import "./InputSearch.css"
function InputSearch() {
    const [listIcon, setListIcon] = useState([
        {
            id: 1,
            type: "Clear",
            img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
        },
        {
            id: 2,
            type: "Rain",
            img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
        },
        {
            id: 3,
            type: "Snow",
            img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
        },
        {
            id: 4,
            type: "Clouds",
            img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
        },
        {
            id: 5,
            type: "Haze",
            img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
        },
        {
            id: 6,
            type: "Smoke",
            img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
        },
        {
            id: 7,
            type: "Mist",
            img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
        },
        {
            id: 8,
            type: "Drizzle",
            img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
        },
    ])
    const [dataWeather, setDataWeather] = useState(null);
    const [formValue, setFormValue] = useState({ location: "" });
    const [error, setError] = useState(null)
    const handleFormValueChange = (event) => {
        setFormValue({ ...formValue, location: event.target.value })
    }

    const handleFetch = async (event) => {
        try {
            event.preventDefault();
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${formValue.location}&units=metric&appid=be7c2643f6fe0c32eb7fe5035e5c8aa5`);
            const data = await response.json();
            console.log(data);
            setDataWeather(data)
            setFormValue({ location: "" })
        }
        catch (err) {
            setError(err.message)
        }
    }
    if (error) {
        return <div>Something went wrong: {error}</div>
    }

    return (
        <div className='inputsearch d-flex flex-column'>
            <form>
                <input name="location" value={formValue.location} onChange={handleFormValueChange} type='text' placeholder='Enter Your Location'></input>
                <button type="submit" onClick={handleFetch} class="btn btn-success">Success</button>
            </form >
            {dataWeather && dataWeather.name ? (
                <div>
                    <b>  {dataWeather.name} </b> <b>{dataWeather["sys"]["country"]}</b>
                    <div>{dataWeather["weather"]["0"]["main"]}</div>
                    <div>{listIcon.filter((item) =>
                        (item.type === dataWeather["weather"]["0"]["main"])
                    ).map((filterItem) => { return (<img style={{ width: "100px", height: "100px" }} src={filterItem.img}></img>) })}</div>
                    <div> Temp {dataWeather["main"]["temp"]}  C</div>
                    <div> Speed Wind {dataWeather["wind"]["speed"]}</div>
                </div>) : (<></>)
            }


        </div >
    )
}

export default InputSearch
