import { useState, useEffect, createRef } from "react"
import { CircularProgress, Grid, Typography, InputLabel,  MenuItem, FormControl, Select} from "@material-ui/core"

import PlaceDetails from '../PlaceDetails/PlaceDetails'

import useStyles from './styles'

const List = (props) => {
    const classes = useStyles()

    const [elRefs, setElRefs] = useState([])

    useEffect(() => {
        const refs = Array(props.places?.length).fill().map((_, i) => elRefs[i] || createRef())
        setElRefs(refs)
    }, [props.places])

    return (
        <div className={classes.container}>
            <Typography variant="h4">
                Restaurants, Hotels & Attractions around you
            </Typography>
            {props.isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                    <InputLabel>Type</InputLabel>
                    <Select value={props.type} onChange={(e) => props.setType(e.target.value)}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={props.rating} onChange={(e) => props.setRating(e.target.value)}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {props.places?.map((place, i) => (
                            <Grid ref={elRefs[i]} item key={i} xs={12}>
                                <PlaceDetails 
                                    place={place}
                                    selected={Number(props.childClicked) === i}
                                    refProp={elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    )
}

export default List