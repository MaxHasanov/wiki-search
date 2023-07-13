import React from 'react';
import './MainContent.scss'
import { observer } from 'mobx-react'
import store from '../store/store'

function MainContent() {
  const { data, search } = store;
  // const [data, setData] = useState([]);
  // const [search, setSearch] = useState('');

  // const WikiAPI = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&limit=10&namespace=0&format=json&`;

  // const fetchData = () => {
  //   fetch(WikiAPI)
  //     .then(res => res.json())
  //     .then(items => {
  //       const formattedData = items[1].map((title, index) => ({
  //         title: title,
  //         url: items[3][index]
  //       }))
  //       setData(formattedData)
  //     })
  // }

  // const changeSearch = (event) => {
  //   let searchString = event.target.value;
  //   setSearch(searchString);
  // }

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      store.fetchData();
    }
  }

  return (
    <div className='container'>
      <h1 className='wiki-title'>WikiSearch</h1>
      <img className='img-search'
        src="http://res.cloudinary.com/kharatpriyank/image/upload/v1513659146/search_ojyiyb.svg" alt="Search"></img>
      <div className="searchBar">
        <input
          value={search}
          onChange={store.changeSearch}
          onKeyDown={onKeyDown}
          type="search" className='searchBox' placeholder="Search Here" name="searchBox">
        </input>
        <button onClick={store.fetchData} id='searchIcon' class="fa fa-search"></button>
        <a className="button" href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">Random!</a>
      </div>
      <ul className='card'>
        {data.map((item, index) => (
          <li className='card-item'
            key={index}>
            <a className='card-item-link' href={item.url} target="_blank">{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default observer(MainContent);