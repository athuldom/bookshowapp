import React, {useLayoutEffect , useState } from 'react'
import './Home.css';
import Header from '../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});


const Home = ( props ) => {


    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [artistsList, setArtistsList] = useState([]);

    const [filterData,setFilterData] = useState({
        movieName:"",
        genres:"",
        artists:"",
        releaseDateStart:"",
        releaseDateEnd:""
    });


    useLayoutEffect (() => {
        let newState= {...filterData}
    // Get upcoming movies
    let data = null;

    fetch(props.baseUrl + "movies?status=PUBLISHED", {
        method: "GET" ,
        headers: {
            "Cache-Control" : "no-cache",
            'Accept': 'application/json'
        },
        body: data,
    }).then((response) => response.json())
	  .then((response) => {
        setUpcomingMovies(response.movies);
    });
    
	// Get released movies
	
	let dataReleased = null;
    

    fetch(props.baseUrl + "movies?status=RELEASED", {
        method: "GET" ,
        headers: {
            "Cache-Control" : "no-cache",
            'Accept': 'application/json'
        },
        body: dataReleased,
    })
    .then((response) => response.json())
    .then((response) => {
        setReleasedMovies(response.movies);
    });

         // Get filters
    let dataGenres = null;

    fetch(props.baseUrl + "genres", {
        method: "GET" ,
        headers: {
            'Cache-Control' : "no-cache",
            'Accept': 'application/json'
        },
        body: dataGenres,
    })
    .then((response) => response.json())
    .then((response) => {
        newState.genres = response.genres;
    });

        // Get artists
        let dataArtists = null;

        fetch(props.baseUrl + "artists", {
            method: "GET" ,
            headers: {
                "Cache-Control" : "no-cache",
                'Accept': 'application/json'
            },
            body: dataArtists,
        })
        .then((response) => response.json())
        .then((response) => {
            newState.artists = response.artists;
        });
        setFilterData(newState);

}, []);

const changeHandler = (event,name) => {
    let newState = {...filterData};
    if(name==='movieName'){
        newState.movieName = event.target.value; 
    }
    if(name==='genres'){
        newState.genres = event.target.value; 
    }
    if(name==='artists'){
        newState.artists = event.target.value; 
    }
    if(name==='releaseDateStart'){
        newState.releaseDateStart = event.target.value; 
    }
    if(name==='releaseDateEnd'){
        newState.releaseDateEnd = event.target.value; 
    }
    setFilterData(newState);
}

const movieClickHandler = (movieId) => {
    props.history.push('/movie/' + movieId);
}

const filterApplyHandler = () => {
    let queryString = "?status=RELEASED";
    if (filterData.movieName !== "") {
        queryString += "&title=" + filterData.movieName;
    }
    if (filterData.genres.length > 0) {
        queryString += "&genres=" + filterData.genres.toString();
    }
    if (filterData.artists.length > 0) {
        queryString += "&artists=" + filterData.artists.toString();
    }
    if (filterData.releaseDateStart !== "") {
        queryString += "&start_date=" + filterData.releaseDateStart;
    }
    if (filterData.releaseDateEnd !== "") {
        queryString += "&end_date=" + filterData.releaseDateEnd;
    }

    let dataFilter = null;

    fetch(props.baseUrl +"movies" + encodeURI(queryString),{
        method: "GET",
        headers: {
            "Cache-Control": "no-cache"
        },
        body: dataFilter,
    })
    .then((response) => response.json())
    .then((response) => {
        setReleasedMovies(response.movies)});

}



const { classes } = props;

return( <div>
    <Header baseUrl={props.baseUrl} />

    <div className={classes.upcomingMoviesHeading}>
        <span>Upcoming Movies</span>
    </div>

    <GridList cols={5} className={classes.gridListUpcomingMovies} >
        {upcomingMovies.map(movie => (
            <GridListTile key={"upcoming" + movie.id}>
                <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                <GridListTileBar title={movie.title} />
            </GridListTile>
        ))}
    </GridList>

    <div className="flex-container">
        <div className="left">
            <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                {releasedMovies.map(movie => (
                    <GridListTile onClick={() => movieClickHandler(movie.id)} className="released-movie-grid-item" key={"grid" + movie.id}>
                        <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                        <GridListTileBar
                            title={movie.title}
                            subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
        <div className="right">
            <Card>
                <CardContent>
                    <FormControl className={classes.formControl}>
                        <Typography className={classes.title} color="textSecondary">
                            FIND MOVIES BY:
                        </Typography>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                        <Input id="movieName" value={filterData.movieName} onChange={(e)=>changeHandler(e,'movieName')} />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                        <Select
                            multiple
                            input={<Input id="select-multiple-checkbox-genre" />}
                            // renderValue={selected => selected.join(",")}
                        
                            value={filterData.genres}
                            onChange={(e)=>changeHandler(e,'genres')}
                        >
                            {genresList.map(genre => (
                                <MenuItem key={genre.id} value={genre.genre}>
                                    <Checkbox checked={filterData.genres.indexOf(genre.genre) > -1} />
                                    <ListItemText primary={genre.genre} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                        <Select
                            multiple
                            input={<Input id="select-multiple-checkbox" />}
                            // renderValue={selected => selected.join(',')}
                            value={filterData.artists}
                            onChange={(e)=>changeHandler(e,'artists')}
                        >
                            {artistsList.map(artist => (
                                <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                    <Checkbox checked={filterData.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                    <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            id="releaseDateStart"
                            label="Release Date Start"
                            type="date"
                            value={filterData.releaseDateStart}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e)=>changeHandler(e,'releaseDateStart')}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            id="releaseDateEnd"
                            label="Release Date End"
                            type="date"
                            value={filterData.releaseDateEnd}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e)=>changeHandler(e,'releaseDateEnd')}
                        />
                    </FormControl>
                    <br /><br />
                    <FormControl className={classes.formControl}>
                        <Button onClick={() =>filterApplyHandler()} variant="contained" color="primary">
                            APPLY
                        </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    </div>
</div > )
}


export default withStyles(styles)(Home);