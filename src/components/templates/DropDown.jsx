import React from 'react';

const DropDown = ({title, options, onCategoryChange}) => {
    return (
        <div className="select">
            <select onChange={onCategoryChange} defaultValue="0" name="format" id="format">
                <option value="0" disabled>
                    {title}
                </option>
                {options.map((o,i) => {
                    return (
                        <option key={i} value={o}>{o.toUpperCase()}</option>
                    )
                })}
            </select>

          </div>
    );
}

export default DropDown;