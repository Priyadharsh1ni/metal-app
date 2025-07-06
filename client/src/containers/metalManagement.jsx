import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const staticMetals = [
  {
    name: 'Gold',
    symbol: 'AU',
    description: 'Precious metal with high purity standards',
    status: 'active',
  },
  {
    name: 'Silver',
    symbol: 'AG',
    description: 'Highly conductive precious metal',
    status: 'active',
  },
  {
    name: 'Platinum',
    symbol: 'PT',
    description: 'Rare and valuable precious metal',
    status: 'active',
  },
  {
    name: 'Palladium',
    symbol: 'PD',
    description: 'Industrial and investment precious metal',
    status: 'active',
  },
];

const MetalMaster = () => {
  const [search, setSearch] = useState('');

  const filteredMetals = staticMetals.filter((metal) =>
    metal.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      {/* Title & Add Button */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Metal Master Data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage static metal data for the system
          </Typography>
        </Box>
      </Box>

      {/* Search Bar */}
      <TextField
        placeholder="Search metals..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Metal Cards */}
      <Grid container spacing={2} mt={1}>
        {filteredMetals.length === 0 ? <Grid item xs={12}>No metals found.</Grid> : filteredMetals.map((metal, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} size={4}>
            <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                  <Typography variant="h6" fontWeight="bold">
                    {metal.name}
                  </Typography>
                  <Chip
                    label={metal.status}
                    size="small"
                    color="default"
                    sx={{ fontWeight: 'bold', borderRadius: '8px', backgroundColor: '#000', color: '#fff' }}
                  />
                </Box>
                <Typography variant="subtitle2" color="text.secondary" textAlign={'start'}>
                  {metal.symbol}
                </Typography>
                <Typography variant="body2" mt={1} textAlign={'start'}>
                  {metal.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MetalMaster;
