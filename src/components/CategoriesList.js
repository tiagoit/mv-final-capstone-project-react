import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import categories from '../constants/categories';
import { prettifySlug } from '../helpers';
import './CategoriesList.scss';

const CategoriesList = () => (
  <div>
    <Typography variant="h4" component="h2" className="page-title">
      Service categories
    </Typography>
    <div className="cards-container">
      {Object.keys(categories).map(category => (
        <Card className="card" key={category}>
          <CardActionArea component={RouterLink} to={`/category/${category}`}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={`https://i.picsum.photos/id/${parseInt(Math.random() * 100, 10)}/160/80.jpg`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">{prettifySlug(category)}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" component={RouterLink} to={`/category/${category}`}>
              See services
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  </div>
);
export default CategoriesList;
