import React, { useState } from "react";

const Feedback = () => {
  // const [feedbackType,setFeedbackType]=useState("report")
  const [formData, setFormData] = useState({
    feedbackType: '',
    des: '',
  });
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  function submitFeedback(e:React.FormEvent<HTMLFormElement>): void{
    e.preventDefault();
    const type = formData.feedbackType;
    const des = formData.des;
    alert(`You submit successfully, please send them to server`+ JSON.stringify(formData))
  }

 
return (
    <div className="font-sans modal justify-center items-center   bg-green-200 text-primeColor border-2 border-gray-500 rounded-md p-5 flex ">
      <div className="justify-center  items-center flex ">
        <form onSubmit={submitFeedback} className="flex flex-col  justify-center  items-center ">
          <label htmlFor="" className="  font-bold w-full">
            Please choose the feedback type
         
          <select
          
            name="feedbackType"
            value={formData.feedbackType}
            onChange={handleChange}
            id=""
            className="font-normal ml-5 border-2 border-gray-500 rounded-md justify-center"
          >
            <option value="report">report</option>
            <option value="bugs">bugs</option>
            <option value="suggestion">suggestion</option>
          </select>
          </label>
     
          <label htmlFor="" className=" font-bold">
            Please input the description
          
          <textarea
            rows={5}
            name="des"
            value={formData.des}
            onChange={handleChange}
            className="w-full  mt-3  border-2 border-gray-500 rounded-md"
          /></label>
          <button
            type="submit"
            className="justify-center  bg-black text-white p-2 rounded-full"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
