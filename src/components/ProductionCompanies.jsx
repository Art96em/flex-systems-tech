import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const ProductionCompanies = ({ companies }) => {
  return (
    <Box mt={6}>
      <Typography variant="h5" gutterBottom>
        Production Companies
      </Typography>

      <Grid container spacing={2}>
        {companies.map((company) => (
          <Grid key={company.id}>
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "white",
              }}
            >
              <CardContent>
                <Typography variant="body2">{company.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductionCompanies;
