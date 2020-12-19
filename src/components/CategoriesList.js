import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import categories from '../constants/categories';
import placeholders from '../constants/placeholders';
import { prettifySlug } from '../helpers';
import './CategoriesList.scss';

const CategoriesList = () => (
  <div>
    <Typography variant="h4" component="h1">Service categories</Typography>

    <div className="cards-container">
      {Object.keys(categories).map((category, i) => (
        <Card className="card" key={category}>
          <CardActionArea component={RouterLink} to={`/category/${category}`}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={placeholders[i]}
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
