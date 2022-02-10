/*eslint-disable*/
import "./App.css";
import logo from "./apple.png";
import React, { useState } from "react";

const apiData = [
	{ title: "Corona Vaccine", date: "Feb 07, 2022" },
	{ title: "Winter Olympic", date: "Feb 08, 2022" },
	{ title: "Bit Coin", date: "Feb 09, 2022" },
];

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

const Detail = ({ data }) => {
	console.log(data);
	return (
		<div className="detail">
			<p style={{ color: "black" }}>This is {data.title}'s Detail</p>
		</div>
	);
};

const News = ({ data, index }) => {
	const [like, setLike] = useState(0);
	const [detailState, setDetailState] = useState(false);
	const handleLiktBtn = (e) => {
		setLike((prev) => prev + 1);
	};
	const handleNewsClick = (e) => {
		const target = e.target.parentElement;
		if (Number(target.id) === Number(index)) {
			setDetailState((prev) => !prev);
		}
	};
	return (
		<li className="content" id={index}>
			<h4 onClick={handleNewsClick}>
				{data.title}
				<div>
					<button onClick={handleLiktBtn}>👍</button>
					<span> {like}</span>
				</div>
			</h4>
			<p>{data.date}</p>
			{detailState && <Detail data={data}></Detail>}
		</li>
	);
};

const Form = ({ makeNews }) => {
	const [value, setValue] = React.useState("");
	const handleInput = (e) => {
		setValue(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (value === "") {
			return;
		}
		makeNews(value);
		setValue("");
	};
	return (
		<div>
			<form action="" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Write a title"
					onChange={handleInput}
					value={value}
				/>
				<button>Add a News</button>
			</form>
		</div>
	);
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
	const makeNews = (value) => {
		setDatas((prev) => [...prev, { title: value, date: "Feb 11, 2022" }]);
	};

	return (
		<div className="App">
			<nav>
				<img src={logo} style={{ width: "20px" }} alt="" />
				<span>Today's News Ranking</span>
			</nav>
			<button className="sortBtn" onClick={handleSort}>
				Sort by Title
			</button>
			<div>
				<ul className="content-wrapper">
					{datas.map((data, index) => (
						<News data={data} index={index} key={index}></News>
					))}
				</ul>
			</div>

			<Form makeNews={makeNews}></Form>
		</div>
	);
}

export default App;
