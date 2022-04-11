import { Link } from "react-router-dom";

export const Home = () => {
	return (
		<div>
			Home <br /> <Link to='/second'>to second</Link>
		</div>
	);
};

export default Home;
