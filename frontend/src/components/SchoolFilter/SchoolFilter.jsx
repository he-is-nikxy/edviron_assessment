import React from 'react';
import './SchoolFilter.css';

const SchoolFilter = ({ schools, selectedSchools, onChange }) => {
  return (
    <select multiple value={selectedSchools} onChange={e => {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      onChange(selectedOptions);
    }} className="school-filter-select">
      {schools.map(school => (
        <option key={school} value={school}>
          {school}
        </option>
      ))}
    </select>
  );
};

export default SchoolFilter;
