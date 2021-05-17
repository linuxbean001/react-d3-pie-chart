import React from "react";
import PieClass from "./PieClass";
import "./App.css";

function App() {
  const data = [
    {
      label : 'a' , value : 1, color: 'lightblue', 
      subdvision : [
        {label : 'a1' , value : .2, color: 'Darkgreen'},
        {label : 'a2' , value :.2, color: 'lightgreen'},
        {label : 'a3' , value : .2, color: 'amber'},
        {label : 'a4', value : .2, color: 'Darkamber'},
        {label : 'a5', value : .2, color: 'red'}
      ]
    },
    {label : 'b' , value : 4, color: 'darkblue'},
    {label : 'c' , value : 0.5, color: 'gray'},
  ];

  return (
    <div className="App">
      <div>
        <PieClass
          data={data}
          width={960}
          height={500}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
    </div>
  );
}

export default App;
