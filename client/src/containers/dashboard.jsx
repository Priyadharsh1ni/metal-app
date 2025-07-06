import { useState } from 'react';
import { Box, Card, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import MetalManagement from './metalManagement';
import PurityManagement from './purityManagement';
import MetalRate from './metalRate';


const Dashboard = () => {
    const [view, setView] = useState('metal');

    return (
        <Box p={4}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Metal Purity Management System
            </Typography>

            {/* Dashboard Cards */}
            <Grid container spacing={3} mt={5} xs={12}>
                {/* Card 1 */}
                <Grid item xs={6} md={6} size={4}>
                    <Card elevation={3} sx={{ borderRadius: 3, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: "10px" }}>
                        <Typography variant="h8" color="text.secondary">
                            Total Metals
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            4
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Gold, Silver, Platinum, Palladium
                        </Typography>
                    </Card>
                </Grid>

                {/* Card 2 */}
                <Grid item xs={6} md={4} size={4}>
                    <Card elevation={3} sx={{ borderRadius: 3, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: "10px" }}>
                        <Typography variant="h8" color="text.secondary">
                            Active Purities
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            12
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Managed purity records
                        </Typography>
                    </Card>
                </Grid>

                {/* Card 3 */}
                <Grid item xs={12} md={4} size={4}>
                    <Card elevation={3} sx={{ borderRadius: 3, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: "10px" }}>
                        <Typography variant="h8" color="text.secondary" >
                            Rate Updates
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            Today
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Last updated 2 hours ago
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

            <Box mt={5} border={'1px solid #ccc'} borderRadius={3} p={3} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={2}>
                <Typography variant="h6" fontWeight="bold" textAlign="center" gutterBottom>Management Console</Typography>
                <Typography variant='body'>Manage metals, purities, and rates in one comprehensive dashboard</Typography>
                <Box p={1} style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}} borderRadius={3}>
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(_, newValue) => {
                        if (newValue !== null) setView(newValue);
                    }}
                    width="100%"
                    
                >
                    <ToggleButton value="metal" color="primary" sx={{ border: 'none' }}>
                        Metal Master
                    </ToggleButton>
                    <ToggleButton value="purity" color="primary" sx={{ border: 'none' }}>
                        Purity Management
                    </ToggleButton>
                    <ToggleButton value="rates" color="primary" sx={{ border: 'none' }}>
                        Metal Rates
                    </ToggleButton>
                </ToggleButtonGroup>
                </Box>
                <Box mt={2} width={"100%"}>
                    {view === 'metal' && <MetalManagement view={view}/>}
                    {view === 'purity' && <PurityManagement view={view}/>}
                    {view === 'rates' && <MetalRate view={view}/>}
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
