import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../redux/action';

const MetalRate = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All Metals');
    const dispatch = useDispatch()
    const metalRate = useSelector((s) => s.metalRate);
    const historyData = useSelector((s) => s.historyData);
    const [open, setOpen] = useState(false)
    const [updateData, setUpdatedData] = useState({ rate: "", metal: "", purity: "", rateDate: "", description: "" });
    const [showHistory, setShowHistory] = useState(false);

    const cellStyle = {
        padding: '10px 12px',
        minWidth: '100px',
        textAlign: 'left'
    };

    const apicall = async () => {
        await dispatch(action.listMetalRate())
    }

    useEffect(() => {
        apicall()
    }, [])

    const filteredRates = metalRate?.filter(
        (item) =>
            (filter === 'All Metals' || item.metal === filter) &&
            item.metal.toLowerCase().includes(search.toLowerCase())
    );

    const handleUpdate = async () => {
        await dispatch(action.updateMetalRate(updateData))
        await apicall()
        setOpen(false)
    }

    const getHistory = async() =>{
        await dispatch(action.getHistory())
        setShowHistory(true)
    }

    return (
        <Box>
            {/* Header */}
            <Grid container justifyContent="space-between"  mb={2}>
                <Grid item>
                    <Typography variant="h6" fontWeight="bold" textAlign={'start'}>
                        Metal Rate Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign={'start'}>
                        Manage current and historical metal rates
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} >
                        <Grid item>
                            <Button variant="outlined"
                                startIcon={<HistoryIcon />}
                                sx={{ textTransform: 'none', borderRadius: 2 }}
                                onClick={getHistory}>
                                Rate History
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ backgroundColor: 'black', borderRadius: 2 }}>
                                Update Rate
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Search and Filter */}
            <Grid container spacing={2} mb={3} width={"100%"} >
                <Grid item xs={12} sm={8} width={"85%"}>
                    <TextField
                        fullWidth
                        placeholder="Search metals..."
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{textAlign: 'start'}}
                    />
                </Grid>
                <Grid item xs={12} sm={4} width={"13%"}>
                    <Select fullWidth value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <MenuItem value="All Metals">All Metals</MenuItem>
                        <MenuItem value="Gold">Gold</MenuItem>
                        <MenuItem value="Silver">Silver</MenuItem>
                        <MenuItem value="Platinum">Platinum</MenuItem>
                    </Select>
                </Grid>
            </Grid>

            {/* Rate Cards */}
            <Grid container spacing={2}>
                {filteredRates?.length === 0 ? <Grid item xs={12} textAlign={"center"}>No data found</Grid> : filteredRates.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index} size={4}>
                            <Card variant="outlined" sx={{ borderRadius: 3, gap: "10px" }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {item.metal}
                                        </Typography>
                                        <Chip
                                            icon={item.change && <TrendingUpIcon sx={{ fontSize: 16 }} />}
                                            label={item.change ? `${item.change} %` : 'New'}
                                            size="small"
                                            sx={{
                                                backgroundColor: '#111',
                                                color: '#fff',
                                                fontSize: 12,
                                                fontWeight: 'bold',
                                                borderRadius: 1,
                                            }}
                                        />
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" textAlign={'start'}>
                                        {item.purity} Purity
                                    </Typography>

                                    <Typography variant="h5" fontWeight="bold" mt={1} textAlign={'start'}>
                                        ₹{item.rate.toLocaleString()}
                                    </Typography>
                                    <Typography variant='body2' color="text.secondary" textAlign={'start'}>
                                        per gram
                                    </Typography>
                                    <Typography variant='body2' color="text.secondary" textAlign='start'>
                                        Updated: {item.updatedDate}
                                    </Typography>

                                    <Box mt={2}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                backgroundColor: '#f5f5f5',
                                                padding: '6px 10px',
                                                borderRadius: 1,
                                                fontSize: 13,
                                                textAlign: 'start'
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </Box>
                                    
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Update Metal Rate</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate autoComplete="off" mt={1}>
                        <Select
                            fullWidth
                            value={updateData.metal}
                            onChange={(e) => setUpdatedData(prev => ({ ...prev, metal: e.target.value }))}
                            displayEmpty
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="" disabled>Select Metal</MenuItem>
                            <MenuItem value="Gold">Gold</MenuItem>
                            <MenuItem value="Silver">Silver</MenuItem>
                            <MenuItem value="Platinum">Platinum</MenuItem>
                            <MenuItem value="Palladium">Palladium</MenuItem>
                        </Select>

                        <TextField
                            label="Purity"
                            fullWidth
                            margin="normal"
                            value={updateData.purity}
                            onChange={(e) => setUpdatedData(prev => ({ ...prev, purity: e.target.value }))}
                            variant="outlined"
                        />

                        <TextField
                            label="Rate (₹)"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={updateData.rate}
                            onChange={(e) => setUpdatedData(prev => ({ ...prev, rate: e.target.value }))}
                            variant="outlined"
                        />

                        <TextField
                            label="Rate Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            value={updateData.rateDate}
                            onChange={(e) => setUpdatedData(prev => ({ ...prev, rateDate: e.target.value }))}
                            variant="outlined"
                        />

                        <TextField
                            label="Description"
                            fullWidth
                            margin="normal"
                            value={updateData.description}
                            onChange={(e) => setUpdatedData(prev => ({ ...prev, description: e.target.value }))}
                            variant="outlined"
                        />


                        <Box display="flex" justifyContent="flex-end" mt={2} >
                            <Button variant="contained" onClick={handleUpdate} sx={{background: "#000"}}>
                                Update Rate
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog open={showHistory} onClose={() => setShowHistory(false)} fullWidth maxWidth="md">
                <DialogTitle>Rate History</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Historical metal rates for analysis and tracking
                    </Typography>
                    <Box sx={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left' }}>
                                    <th style={cellStyle}>Date</th>
                                    <th style={cellStyle}>Metal</th>
                                    <th style={cellStyle}>Purity</th>
                                    <th style={cellStyle}>Rate</th>
                                    <th style={cellStyle}>Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData?.rates?.map((row, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                        <td style={cellStyle}>{row.createdAt}</td>
                                        <td style={cellStyle}>{row.metal}</td>
                                        <td style={cellStyle}>{row.purity}</td>
                                        <td style={cellStyle}>₹{row.rate.toLocaleString()}</td>
                                        <td style={cellStyle}>{row.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </DialogContent>
            </Dialog>

        </Box>
    );
};

export default MetalRate;


