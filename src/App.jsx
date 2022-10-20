import CustomCheckbox from "./components/CustomCheckbox";
import SliderCarousel from "./components/SliderCarousel";

const elements = [...Array(30).keys()];

const App = () => {
   return (
      <div className="app">
         <div className="checkboxes">
            <h2>
               <span className="text">Gammes</span>
               <span className="accordion-btn"></span>
            </h2>
            <div className="check-boxes-wrap">
               <div className="cutom-check-box-container">
                  <CustomCheckbox checkBoxText="All" />
               </div>
               <div className="cutom-check-box-container">
                  <CustomCheckbox checkBoxText="Agriculture" />
               </div>
               <div className="cutom-check-box-container">
                  <CustomCheckbox checkBoxText="Construction" />
               </div>
               <div className="cutom-check-box-container">
                  <CustomCheckbox checkBoxText="Pieces et service" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default App;
