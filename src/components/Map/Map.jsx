import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery, CircularProgress } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'
import mapStyles from './mapStyles'

import { getWeatherData } from '../../api'

const Map = (props) => {
    const classes = useStyles()
    const isDesktop = useMediaQuery('(min-width:600px)')
    const noImageRestaurant = 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                // defaultCenter={props.coordinates}
                center={props.coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e) => {
                    props.setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    props.setBounds({ ne:e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child) => props.setChildClicked(child)}
            >
                {props.isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : 
                props.places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : noImageRestaurant}
                                        alt="place.name"
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}
                {getWeatherData?.list?.map((data, i) => (
                    // <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                    <div key={i} lat={0.0} lng={0.0}>
                        <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png}`}/>
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map