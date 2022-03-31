import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

export const FeaturesHome: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Building widgets with less pain!</Typography>
      </Grid>
      <Grid item xs={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Editor
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
              Graphql
            </Typography>
            <Typography variant="body2">
              A simple tools to edit, prettify and convert your graphql query to
              string format
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Go to Graphql!</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
