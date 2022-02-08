/*eslint-disable*/
import './App.css';
import logo from './apple.png';
import React, { useState } from 'react';

const apiData = [
  { title: 'Corona Vaccine', date: 'Feb 07, 2022' },
  { title: 'Winter Olympic', date: 'Feb 08, 2022' },
  { title: 'Bit Coin', date: 'Feb 09, 2022' },
];

const Blog = ({ data }) => {
  const [like, setLike] = useState(0);
  const handleLiktBtn = (e) => {
    setLike((prev) => prev + 1);
  };
  return (
    <li className='content'>
      <h4>
        {data.title}
        <div>
          <button onClick={handleLiktBtn}>👍</button>
          <span> {like}</span>
        </div>
      </h4>
      <p>{data.date}</p>
    </li>
  );
};

const sortByBackward = (datas) => {
  const sortedDatas = datas.sort((a, b) => {
    let x = a.title.toLocaleLowerCase();
    let y = b.title.toLocaleLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  return sortedDatas;
};

const sortByForward = (datas) => {
  const sortedDatas = datas.sort((a, b) => {
    let x = a.title.toLocaleLowerCase();
    let y = b.title.toLocaleLowerCase();
    if (x < y) {
      return 1;
    }
    if (x > y) {
      return -1;
    }
    return 0;
  });
  return sortedDatas;
};

function App() {
  const [datas, setDatas] = React.useState(apiData);
  const [sortState, setSortState] = React.useState(false);
  const handleSort = () => {
    if (sortState === false) {
      setDatas((prev) => [...sortByBackward(datas)]);
    } else {
      setDatas((prev) => [...sortByForward(datas)]);
    }
    setSortState((prev) => !prev);
  };

  return (
    <div className='App'>
      <nav>
        <img src={logo} style={{ width: '20px' }} alt='' />
        <span>Today's News Ranking</span>
      </nav>
      <div>
        <ul className='content-wrapper'>
          {datas.map((data, index) => (
            <Blog data={data} key={index}></Blog>
          ))}
        </ul>
      </div>
      <button className='sortBtn' onClick={handleSort}>
        Sort by Title
      </button>
    </div>
  );
}

export default App;
