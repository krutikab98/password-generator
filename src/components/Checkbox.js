import React from 'react';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
