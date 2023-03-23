import React from 'react';

const SearchBox = ({searchValue, setSearchValue}) => {

	function handleSearch(event){
		const searchValue = event.target.value;
    		if (searchValue.length >= 2) {
				fetch(`/api/search?query=${searchValue}`)
					.then(response => response.json())
					.then(data => setSearchValue(data))
					.catch(error => console.error(error));

			} else if (searchValue.length === 0){
				setSearchValue([]);
			}
			else{
				setSearchValue([{id: 0, title: 'Please enter at least 3 characters to search.'}])
			}
			setSearchValue(searchValue);
			
		}

	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={searchValue}
				onChange={handleSearch}
				placeholder='Type to search...'
			></input>
		</div>
	);
};

export default SearchBox;