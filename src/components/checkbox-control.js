
export default function CheckboxControl({ label, ...props }) {
    return (
      <div>
        <input type="checkbox" {...props} />
        <label>{label}</label>
      </div>
    );
  };

  export  function CustomButton({...props }) {
    return (
      <div>
        <input {...props} />
      </div>
    );
  };