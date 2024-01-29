import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import { ServersList } from "../../components/Servers/ServersList";
import { ConvosList } from "../../components/InfoList/ConvosInfo/ConvosList";
import { TopAppBar } from "../../components/MainContent/TopAppBar";
import { UserPanel } from "../../components/InfoList/UserPanel";
import { Outlet } from "react-router-dom";
import classes from './Dashboard.module.css';

// TODO: make this responsive, when you get time
const HomeDashboard = () => {
	return <Box>
		<Grid container direction="row">
			<Grid
				className={ classes.grid }
				item
				lg={ .7 }
				sm={ .7 }
				xs={ .7 }
				zeroMinWidth
				sx={ { backgroundColor: "#0A1717" } }
			>
				<ServersList/>
			</Grid>
			<Grid
				className={ classes["grid-info"] }
				item
				lg={ 1.5 }
				sm={ 1.5 }
				xs={ 1.5 }
				zeroMinWidth
				sx={ { backgroundColor: "#252A2E" } }
			>
				<ConvosList/>
				<UserPanel/>
			</Grid>
			<Grid
				className={ classes.grid }
				item
				lg={ 7.8 }
				sm={ 7.8 }
				xs={ 7.8 }
				zeroMinWidth
				sx={ { backgroundColor: "#0A1717" } }
			>
				<TopAppBar/>
				<Outlet/>
			</Grid>
			<Grid
				className={ classes.grid }
				item
				lg={ 2 }
				sm={ 2 }
				xs={ 2 }
				zeroMinWidth
				sx={ { backgroundColor: "#252A2E" } }
			>
				Home Details
			</Grid>
		</Grid>
	</Box>;
};

export default HomeDashboard;


