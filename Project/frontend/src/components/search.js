import React from "react";
import "../components/product_li.js";
import ProductLi from "../components/product_li.js";
function Dropdown() {
  const [options] = ProductLi
  const [search, setSearch] = useState('');

  function handleSearch(e) {
    setSearch(e.target.value); 
  }

  const filteredOptions = options.filter(o => 
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}  
      />

      <select>
        {filteredOptions.map(item => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}