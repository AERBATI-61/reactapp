import './App.css';
import User from "./components/User";
import Navbar from "./components/Navbar";
function App() {
    const a = 5
    const b = 10
    const c = "Arafat"
    const boolean = false
    return (
        <div className="container">
            <h1 className={"naber"}>Arafat</h1>
            <h3>{a+b}</h3>
            <h3>{(a+b)/a}</h3>
            <h3>{c + " Emin"}</h3>
            <div>
                {
                    boolean? <h3>bu True donecektir</h3>
                        : <p style={{color:"blue", fontSize: "40px"}}>sen adamsin</p>
                }
            </div><br/>
            <p>Ben Navbar Componen'ti</p>
            <Navbar title = "User Arafat"/><br/>

            <p>Ben User Componen'ti</p>
            <User
                name = "Rahile"
                surname = "Emin"
                salary = "10000"
                department = "Bilgisayar Muhendisi"
            />
            <User
                name = "Meryem"
                surname = "Emin"
                salary = "15000"
                department = "Ingilizce Ogretmeni"
            />


        </div>
    );
}

export default App;
