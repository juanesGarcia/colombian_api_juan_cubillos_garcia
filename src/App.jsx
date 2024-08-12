
import Airport from './Screens/Airport'
import President from './Screens/President'
import TouristicAttraction from './Screens/TouristicAttraction'
import './Style/App.css'
function App() {


  return (
    <div className="container">
    <input type="radio" name="option" id="1" />
    <label htmlFor="1">
      <div className="tab-name">President</div>
      <div className="tab-content">
        <President></President>
      </div>
    </label>
    <input type="radio" name="option" id="2" />
    <label htmlFor="2">
      <div className="tab-name">Airport</div>
      <div className="tab-content">
        <Airport></Airport>
      </div>
    </label>
    <input type="radio" name="option" id="3" />
    <label htmlFor="3">
      <div className="tab-name">TouristicAttraction</div>
      <div className="tab-content">
      <TouristicAttraction></TouristicAttraction>
      </div>
    </label>

  </div>
  )
}

export default App
