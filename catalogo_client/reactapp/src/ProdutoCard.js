import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 230,
        maxWidth: 230,
    },
    media: {
        height: 140,
    },
});

export default function ProdutoCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} onClick={() => console.log('card clicked')}>
        <CardActionArea>
        <CardMedia
        className={classes.media}
        image={"/thumbs/" + props.codigo + "_" + props.atualizado + "_thumb.jpg"}
        title="My Title"
        />
        <CardContent>
        <Typography gutterBottom>
        {props.codigo}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.descricao}
        </Typography>
        </CardContent>
        </CardActionArea>

        </Card>
    );
}
