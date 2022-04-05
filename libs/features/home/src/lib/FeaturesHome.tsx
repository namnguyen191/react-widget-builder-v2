import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const FeaturesHome: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Building widgets with less pain!</Typography>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ minWidth: 275, minHeight: 230 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Editor
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                Graphql
              </Typography>
              <Typography variant="body2">
                A simple tools to edit, prettify and convert your graphql query
                to string format
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/graphql">
                <Button size="small">Go to Graphql!</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ minWidth: 275, minHeight: 230 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Editor
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                Stjs Transformation
              </Typography>
              <Typography variant="body2">
                A better editor for your transformation function
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/stjs-editor">
                <Button size="small">Go to Stjs Editor!</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
