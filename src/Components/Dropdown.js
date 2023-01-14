import React, { Component, useState, useEffect, useRef } from 'react';
import arrow from './arrow-down.svg';
import search from './search.svg';
import './Dropdown.css';

export default function Dropdown(props){
    const { placeholder = 'Select options', 
            label = 'Options', 
            clearMessage = 'Clear Selected',
            selectMessage = 'Select All',
            isMultiselect = false,
            searchBar = false,
            maxDropdownHeight = '25vh',
            options,
            setOptions,
            ...restProps } = props;

    //open state of dropdown menu
    const [open, setOpen] = useState(false);

    //state of displayed option(s) in dropdown field
    const [selectedOption, setSelectedOption] = useState(placeholder);

    //state of search text for optional search box
    const [searchText, setSearchText] = useState("");

    //reference for outside click
    const ref = useRef(null);

    //handle click into the dropdown -- toggle & clear search if needed
    const handleOpen = () => {
        setOpen(!open);
        if(searchBar && !open){
            setSearchText("");
        }
    };

    //handle click outside of the dropdown
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
            if(searchBar) {
                setSearchText("");
            }
        }
    };

    //handle search
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    //handle clearing all selections
    const clearAll = () => {
        let newOptions = [...options];
        newOptions.map(option => {
            option.selected = false;
        });
        setOptions(newOptions);
        setSelectedOption(placeholder);
    }

    //handle selecting all options
    const selectAll = () => {
        var newSelectedOptions = "";
        let newOptions = [...options];;
        newOptions.map(option => {
            option.selected = true;
            if (newSelectedOptions == ""){
                newSelectedOptions = option.title;
            }
            else{
                newSelectedOptions += ", " + option.title;
            }
        });
        setOptions(newOptions);
        setSelectedOption(newSelectedOptions);
    }

    //handling clicking a single selection -- toggle; keep open if multiselect, close if single select
    const toggleSelection = (id, title) => {
        let newOptions = [...options];;
        if(!isMultiselect){
            newOptions.map(option => {
                if (option.title == title){
                    option.selected = !option.selected;
                    if(option.selected){
                        setSelectedOption(title);
                    }
                    else{
                        setSelectedOption(placeholder);
                    }
                }
                else{
                    option.selected = false;
                }
            });
            setOptions(newOptions);
            setOpen(false);
            if(searchBar){
                setSearchText("");
            }
        }
        else{
            newOptions[id].selected = !newOptions[id].selected;
            var newSelectedOptions = "";
            newOptions.map(option => {
                    if(option.selected){
                        if (newSelectedOptions == ""){
                            newSelectedOptions = option.title;
                        }
                        else{
                            newSelectedOptions += ", " + option.title;
                        }
                    }
                });
            if(newSelectedOptions == ""){
                newSelectedOptions = placeholder;
            }
            setOptions(newOptions);
            setSelectedOption(newSelectedOptions);
        }
    }

    //listen for outside click
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, []);

    return(
        <div className="Dropdown-element" ref={ref}>
    {/* Dropdown field elements */}
            <fieldset className="Dropdown-box" onClick={handleOpen}>
                <legend>{label}</legend>
                <div className="Dropdown-inner">
                    {selectedOption}
                    <div className="Arrow-box">
                        {open ? (
                            <img src={arrow} className="Dropdown-svg-flip"/>
                        ) : (
                            <img src={arrow} className="Dropdown-svg"/>
                        )}
                    </div>
                </div>
            </fieldset>
    {/* Dropdown menu elements */}
            {open ? (
                <div className="Options-wrapper">
                        <span className="Options-listwrapper" style={{maxHeight: maxDropdownHeight}}>
    {/* Render searchbar if props.searchBar == true */}
                            {searchBar ? (
                                <span className="Options-header">
                                <span className="Options-search">
                                    <img src={search} className="Options-searchsvg"/>
                                    <input className="Options-searchinput"
                                        placeholder="Search"
                                        onChange={handleSearchChange}
                                        value={searchText} />
                                </span>
                                <span className="Options-clear" onClick={() => clearAll()}>
                                    {clearMessage}
                                </span>
                                </span> ) : 
                                <span className="Options-header">
                                 <span className="Options-clearnosearch"
                                    onClick={() => clearAll()}>
                                    {clearMessage}
                                  </span> 
                                </span> }
    {/* Enable Select All ONLY if dropdown is a multiselect */}
                        {isMultiselect ? 
                            <span className="Options-listitemwrapper" 
                            onClick={() => selectAll()}>
                                {selectMessage}
                            </span> : null }
    {/* If there is a search bar text has been searched, render only elements containing that substring*/}
    {/* Otherwise, render all elements */}
                        {searchBar ?
                            (options.map(option => (
                            option.title.toLowerCase().includes(searchText.toLowerCase()) ? (
                                <span className={option.selected ? "Options-selectedlistitem" : "Options-listitemwrapper" }
                                    id={option.id}
                                    onClick={() => toggleSelection(option.id, option.title)}
                                    key={option.title}>
                                    {option.title}
                                </span>
                            ) : null ))) 
                        : (options.map(option => (
                            <span className={option.selected ? "Options-selectedlistitem" : "Options-listitemwrapper" }
                                    id={option.id}
                                    onClick={() => toggleSelection(option.id, option.title)}
                                    key={option.title}>
                                    {option.title}
                                </span> )
                            )) }
                        </span>
                </div>
            ) : null}
        </div>
    )
}