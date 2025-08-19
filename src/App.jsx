import DriverPartner from "./pages/DriverPartner";


function App() {
  return (
    <div>
      <DriverPartner onSubmit={(data) => console.log("Form Data:", data)} />
    </div>
  );
}

export default App;

