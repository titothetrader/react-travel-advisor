import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'

const PlaceDetails = (props) => {
    const classes = useStyles()

    if (props.selected) props.refProp?.current?.scrollIntoView({behavior: "smooth", block: "start"})

    const noImageRestaurant = 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'

    return (
        props.place.name &&
        <Card elevation={6}>
            <CardMedia 
                style={{height: 350}}
                image={props.place.photo ? props.place.photo.images.large.url : noImageRestaurant}
                title={props.place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{props.place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating size="medium" value={Number(props.place.rating)} readOnly/>
                    <Typography gutterBottom variant="subtitle1">out of {props.place.num_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{props.place.price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{props.place.ranking}</Typography>
                </Box>
                {props.place?.awards?.map((award) => (
                    <Box my={1} display="flex" justifyContent="space-between" alignItemsCenter>
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {props.place?.cuisine?.map(({ name }) => (
                    <Chip key={name} size="small" label={name} className={classes.chip}/>
                ))}
                {props.place?.address && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon />{props.place.address}</Typography>
                )}
                {props.place?.phone && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing}>
                        <PhoneIcon />{props.place.phone}</Typography>
                )}
                <CardActions>
                    <Button size="small" color="primary" onClick={() => window.open(props.place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={() => window.open(props.place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default PlaceDetails