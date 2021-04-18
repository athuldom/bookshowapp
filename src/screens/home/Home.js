import React, {useState, useEffect} from 'react';
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

const Home = (props) => {
    const [movieName, setmovieName] = useState("")
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [releasedMovies, setreleasedMovies] = useState([])
    const [genres, setgenres] = useState([])
    const [artists, setartists] = useState([])
    const [genresList, setgenresList] = useState([])
    const [artistsList, setartistsList] = useState([])
    const [realeaseDateStart, setreleaseDateStart] = useState("")
    const [realeaseDateEnd, setrealeaseDateEnd] = useState("")

    const classes = props.classes

    // useEffect(() => {
    //     fetchmovieName()
    // }, [])
    
    
    useEffect(() => {
        // fetchUpcomingMovies()
        // fetchreleasedMovies()
        // fetchgenres()
        // fetchartist()
        // fetchgenresList()
        // fetchartistsList()
    }, [])
    
    // useEffect(() => {
    // fetchreleaseDataStart()
    // }, [])
    
    // useEffect(() => {
    // fetchreleaseDateEnd()
    // })

    const fetchreleasedMovies = () => {
        fetch("http://localhost:8085/api/v1/movies?status=RELEASED", { 
            method: 'GET', 
            mode: 'no-cors',
            headers: new Headers({
                'Cache-Control': 'no-cache',
                'Accept': 'application/json'
            })
        }).then(async response => {
            const data = await response.json()
            setreleasedMovies(data.movies)
        }).catch(err => {});
    }

    const fetchUpcomingMovies = () => {
        fetch("http://localhost:8085/api/v1/movies?status=PUBLISHED", { 
            method: 'GET', 
            mode: 'no-cors',
            headers: new Headers({
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
            })
        }).then(async response => {
            const data = await response.json()
            setUpcomingMovies(data.movies)
        }).catch(err => {});
    }

    const fetchgenres = () => {
        fetch("http://localhost:8085/api/v1/genres", { 
            method: 'GET', 
            mode: 'no-cors',
            headers: new Headers({
                'Cache-Control': 'no-cache',
                'Accept': 'application/json'
            })
        }).then(async response => {
            const data = await response.json()
            setgenres(data.genres)
        }).catch(err => {});
    }

    const fetchartist = () => {
        // fetch("http://localhost:8085/api/v1/artists", { 
        //     method: 'get', 
        //     mode: 'no-cors',
        //     headers: new Headers({
        //         'Cache-Control': 'no-cache',
        //         'Accept': 'application/json'
        //     })
        // }).then(async response => {
        //     const data = await response.json()
        //     setartists(data.artists)
        // }).catch(err => {});
        let dataArtists = null;
        let xhrArtists = new XMLHttpRequest();
        xhrArtists.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // that.setState({
                //     artistsList: JSON.parse(this.responseText).artists
                // });
            }
        });

        xhrArtists.open("GET", props.baseUrl + "movies?status=PUBLISHED");
        xhrArtists.setRequestHeader("Cache-Control", "no-cache");
        xhrArtists.send(dataArtists);
    }

    const fetchartistsList = () => {
        fetch("http://localhost:8085/api/v1/movies?status=PUBLISHED", { 
            method: 'get',
            mode: 'no-cors', 
            headers: new Headers({
                'Cache-Control': 'no-cache',
                'Accept': 'application/json'
            })
        }).then(async response => {
            const data = await response.json()
            setartistsList(data.movies)
        }).catch(err => { });
    }

    const fetchgenresList = () => {
        fetch("http://localhost:8085/api/v1/movies?status=PUBLISHED", { 
            method: 'get', 
            mode: 'no-cors',
            headers: new Headers({
                'Cache-Control': 'no-cache',
                'Accept': 'application/json'
            })
        }).then(async response => {
            const data = await response.json()
            setgenresList(data.movies)
        }).catch(err => { });
    }
    




   const  movieNameChangeHandler = event => {
        setmovieName(event.target.value);
    }

   const  genreSelectHandler = event => {        
        setgenres(event.target.value)
    }

    const artistSelectHandler = event => {        
        setartists(event.target.value);
    }

   const  releaseDateStartHandler = event => {
        setreleaseDateStart(event.target.value)
    }

   const releaseDateEndHandler = event => {
        setrealeaseDateEnd(event.target.value);
    }

   const movieClickHandler = (movieId) => {
       props.history.push('/movie/' + movieId);
    }

   const filterApplyHandler = () => {
        let queryString = "?status=RELEASED";
        if (movieName !== "") {
            queryString += "&title=" + movieName;
        }
        if (genres.length > 0) {
            queryString += "&genres=" + genres.toString();
        }
        if (artists.length > 0) {
            queryString += "&artists=" + artists.toString();
        }
        if (realeaseDateStart !== "") {
            queryString += "&start_date=" + realeaseDateStart;
        }
        if (realeaseDateEnd !== "") {
            queryString += "&end_date=" + realeaseDateEnd;
        }
        let dataFilter = null;
        let xhrFilter = new XMLHttpRequest();
        xhrFilter.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                setreleasedMovies(JSON.parse(this.responseText).movies)
            }
        });

        xhrFilter.open("GET", props.baseUrl + "movies" + encodeURI(queryString));
        xhrFilter.setRequestHeader("Cache-Control", "no-cache");
        xhrFilter.send(dataFilter);
    }



    return (
        <div>
                <Header baseUrl={props.baseUrl} />

                <div className={classes.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
                </div>

                <GridList cols={6} className={classes.gridListUpcomingMovies} >
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
                                    <Input id="movieName" onChange={movieNameChangeHandler} />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox-genre" />}
                                        renderValue={selected => selected.join(',')}
                                        value={genres}
                                        onChange={genreSelectHandler}
                                    >
                                        {genresList.map(genre => (
                                            <MenuItem key={genre.id} value={genre.genre}>
                                                <Checkbox checked={genres.indexOf(genre.genre) > -1} />
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
                                        renderValue={selected => selected.join(',')}
                                        value={artists}
                                        onChange={artistSelectHandler}
                                    >
                                        {artistsList.map(artist => (
                                            <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                                <Checkbox checked={artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
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
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={releaseDateStartHandler}
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateEnd"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={releaseDateEndHandler}
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
                
        </div>
    )
}

export default withStyles(styles)(Home);

// class Home extends Component {

//     constructor() {
//         super();
//         this.state = {
//             movieName: "",
//             upcomingMovies: [],
            // releasedMovies: [],
            // genres: [],
            // artists: [],
            // genresList: [],
            // artistsList: [],
            // releaseDateStart: "",
            // releaseDateEnd: ""
//         }
//     }

//     componentWillMount() {
//         // Get upcoming movies
//         // let data = null;
//         // let xhr = new XMLHttpRequest();
//         // let that = this;
//         // xhr.addEventListener("readystatechange", function () {
//         //     if (this.readyState === 4) {
//         //         that.setState({
//         //             upcomingMovies: JSON.parse(this.responseText).movies
//         //         });
//         //     }
//         // });

//         // xhr.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
//         // xhr.setRequestHeader("Cache-Control", "no-cache");
//         // xhr.send(data);

//         // Get released movies
//         let dataReleased = null;
//         let xhrReleased = new XMLHttpRequest();
//         xhrReleased.addEventListener("readystatechange", function () {
//             if (this.readyState === 4) {
//                 that.setState({
//                     releasedMovies: JSON.parse(this.responseText).movies
//                 });
//             }
//         });

//         xhrReleased.open("GET", this.props.baseUrl + "movies?status=RELEASED");
//         xhrReleased.setRequestHeader("Cache-Control", "no-cache");
//         xhrReleased.send(dataReleased);

//         // Get filters
//         let dataGenres = null;
//         let xhrGenres = new XMLHttpRequest();
//         xhrGenres.addEventListener("readystatechange", function () {
//             if (this.readyState === 4) {
//                 that.setState({
//                     genresList: JSON.parse(this.responseText).genres
//                 });
//             }
//         });

//         xhrGenres.open("GET", this.props.baseUrl + "genres");
//         xhrGenres.setRequestHeader("Cache-Control", "no-cache");
//         xhrGenres.send(dataGenres);

//         // Get artists
//         let dataArtists = null;
//         let xhrArtists = new XMLHttpRequest();
//         xhrArtists.addEventListener("readystatechange", function () {
//             if (this.readyState === 4) {
//                 that.setState({
//                     artistsList: JSON.parse(this.responseText).artists
//                 });
//             }
//         });

//         xhrArtists.open("GET", this.props.baseUrl + "artists");
//         xhrArtists.setRequestHeader("Cache-Control", "no-cache");
//         xhrArtists.send(dataArtists);
//     }

//     movieNameChangeHandler = event => {
//         this.setState({ movieName: event.target.value });
//     }

//     genreSelectHandler = event => {
//         this.setState({ genres: event.target.value });
//     }

//     artistSelectHandler = event => {
//         this.setState({ artists: event.target.value });
//     }

//     releaseDateStartHandler = event => {
//         this.setState({ releaseDateStart: event.target.value });
//     }

//     releaseDateEndHandler = event => {
//         this.setState({ releaseDateEnd: event.target.value });
//     }

//     movieClickHandler = (movieId) => {
//         this.props.history.push('/movie/' + movieId);
//     }

//     filterApplyHandler = () => {
//         let queryString = "?status=RELEASED";
//         if (this.state.movieName !== "") {
//             queryString += "&title=" + this.state.movieName;
//         }
//         if (this.state.genres.length > 0) {
//             queryString += "&genres=" + this.state.genres.toString();
//         }
//         if (this.state.artists.length > 0) {
//             queryString += "&artists=" + this.state.artists.toString();
//         }
//         if (this.state.releaseDateStart !== "") {
//             queryString += "&start_date=" + this.state.releaseDateStart;
//         }
//         if (this.state.releaseDateEnd !== "") {
//             queryString += "&end_date=" + this.state.releaseDateEnd;
//         }

//         let that = this;
//         let dataFilter = null;
//         let xhrFilter = new XMLHttpRequest();
//         xhrFilter.addEventListener("readystatechange", function () {
//             if (this.readyState === 4) {
//                 that.setState({
//                     releasedMovies: JSON.parse(this.responseText).movies
//                 });
//             }
//         });

//         xhrFilter.open("GET", this.props.baseUrl + "movies" + encodeURI(queryString));
//         xhrFilter.setRequestHeader("Cache-Control", "no-cache");
//         xhrFilter.send(dataFilter);
//     }

//     render() {
//         const { classes } = this.props;
//         return (
//             <div>
//                 <Header baseUrl={this.props.baseUrl} />

//                 <div className={classes.upcomingMoviesHeading}>
//                     <span>Upcoming Movies</span>
//                 </div>

//                 <GridList cols={6} className={classes.gridListUpcomingMovies} >
//                     {this.state.upcomingMovies.map(movie => (
//                         <GridListTile key={"upcoming" + movie.id}>
//                             <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
//                             <GridListTileBar title={movie.title} />
//                         </GridListTile>
//                     ))}
//                 </GridList>

                // <div className="flex-container">
                //     <div className="left">
                //         <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                //             {this.state.releasedMovies.map(movie => (
                //                 <GridListTile onClick={() => this.movieClickHandler(movie.id)} className="released-movie-grid-item" key={"grid" + movie.id}>
                //                     <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                //                     <GridListTileBar
                //                         title={movie.title}
                //                         subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                //                     />
                //                 </GridListTile>
                //             ))}
                //         </GridList>
                //     </div>
                //     <div className="right">
                //         <Card>
                //             <CardContent>
                //                 <FormControl className={classes.formControl}>
                //                     <Typography className={classes.title} color="textSecondary">
                //                         FIND MOVIES BY:
                //                     </Typography>
                //                 </FormControl>

                //                 <FormControl className={classes.formControl}>
                //                     <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                //                     <Input id="movieName" onChange={this.movieNameChangeHandler} />
                //                 </FormControl>

                //                 <FormControl className={classes.formControl}>
                //                     <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                //                     <Select
                //                         multiple
                //                         input={<Input id="select-multiple-checkbox-genre" />}
                //                         renderValue={selected => selected.join(',')}
                //                         value={this.state.genres}
                //                         onChange={this.genreSelectHandler}
                //                     >
                //                         {this.state.genresList.map(genre => (
                //                             <MenuItem key={genre.id} value={genre.genre}>
                //                                 <Checkbox checked={this.state.genres.indexOf(genre.genre) > -1} />
                //                                 <ListItemText primary={genre.genre} />
                //                             </MenuItem>
                //                         ))}
                //                     </Select>
                //                 </FormControl>

                //                 <FormControl className={classes.formControl}>
                //                     <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                //                     <Select
                //                         multiple
                //                         input={<Input id="select-multiple-checkbox" />}
                //                         renderValue={selected => selected.join(',')}
                //                         value={this.state.artists}
                //                         onChange={this.artistSelectHandler}
                //                     >
                //                         {this.state.artistsList.map(artist => (
                //                             <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                //                                 <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                //                                 <ListItemText primary={artist.first_name + " " + artist.last_name} />
                //                             </MenuItem>
                //                         ))}
                //                     </Select>
                //                 </FormControl>

                //                 <FormControl className={classes.formControl}>
                //                     <TextField
                //                         id="releaseDateStart"
                //                         label="Release Date Start"
                //                         type="date"
                //                         defaultValue=""
                //                         InputLabelProps={{ shrink: true }}
                //                         onChange={this.releaseDateStartHandler}
                //                     />
                //                 </FormControl>

                //                 <FormControl className={classes.formControl}>
                //                     <TextField
                //                         id="releaseDateEnd"
                //                         label="Release Date End"
                //                         type="date"
                //                         defaultValue=""
                //                         InputLabelProps={{ shrink: true }}
                //                         onChange={this.releaseDateEndHandler}
                //                     />
                //                 </FormControl>
                //                 <br /><br />
                //                 <FormControl className={classes.formControl}>
                //                     <Button onClick={() => this.filterApplyHandler()} variant="contained" color="primary">
                //                         APPLY
                //                     </Button>
                //                 </FormControl>
                //             </CardContent>
                //         </Card>
                //     </div>
                // </div>
//             </div >
//         )
//     }
// }

// export default withStyles(styles)(Home);