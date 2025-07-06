import { Box, Button, Grid, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { action } from '../redux/action';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Popup from '../Component/popup';
import DeletePopup from '../Component/deletePopup';
import { service } from '../redux/service';
import { DataGrid } from '@mui/x-data-grid';

function PurityManagement(view) {
    const dispatch = useDispatch();
    const [purityData, setPurityData] = useState([]);

    const apicall = async () => {
        const data = await service.purityData()
        setPurityData(data)
    }
    useEffect(() => {
        apicall()
    }, [dispatch]);

    const [openPopup, setOpenPopup] = useState(false);
    const [updateData, setUpdateData] = useState({ id: "", metal: "", purity: "" });
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [addDataPopup, setAddDataPopup] = useState(false);


    const handleEdit = async (purity) => {
        setUpdateData({ id: purity._id, metal: purity.metal, purity: purity.purity });
        setOpenPopup(true);
    }

    const onSubmit = async (id) => {
        await dispatch(action.updatePurityData(id, { updateData }))
        await apicall()
        setOpenPopup(false);
    }

    const handleDelete = async (id) => {
        setDeleteId(id);     
        setIsOpen(true);

    }

    const handleConfirmDelete = async () => {
        if (deleteId) {
            await dispatch(action.deletePurityData(deleteId));
            await apicall()
            setIsOpen(false);
            setDeleteId(null);
        }
    };

    const handleCreate = async () => {
        setOpenPopup(true)
        setAddDataPopup(true)
    }

    const createPurity = async () => {
        await dispatch(action.createdPurityData(updateData))
        setOpenPopup(false);
        await apicall()
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Grid display="flex" flexDirection="row" justifyContent="space-between">
                <Grid display={"flex"} flexDirection={"column"} alignItems="flex-start"><Typography variant="h6" fontWeight="bold" gutterBottom>
                    Purity Management
                </Typography>
                    Create, Read, Update, and Delete purity records
                </Grid>
                <Grid><Button onClick={handleCreate} sx={{ borderRadius: "10px", backgroundColor: "black", color: "white", padding: "10px 20px" }}>Create Purity</Button></Grid>
            </Grid>
            <Grid>
            </Grid>
            <> {!purityData ? <Box sx={{ width: '100%', height: 400 }}>
                <DataGrid
                    {...purityData}
                    loading
                    slotProps={{
                        loadingOverlay: {
                            variant: 'skeleton',
                            noRowsVariant: 'skeleton',
                        },
                    }}
                />
            </Box> : <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Metal</TableCell>
                            <TableCell align="right">Purity</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Created Date</TableCell>
                            <TableCell align="right">State</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purityData ? purityData?.map((purity) => (
                            <TableRow key={purity._id}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="body2" fontWeight="bold">
                                        {purity.metal}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">{purity.purity}</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">{new Date(purity.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell align="right">State</TableCell>
                                <TableCell align="right"><Grid display={"flex"} justifyContent={'end'} gap={2}><Grid onClick={() => handleEdit(purity)}><EditIcon /></Grid><Grid onClick={() => handleDelete(purity._id)}><DeleteIcon /></Grid></Grid></TableCell>
                            </TableRow>
                        )) : <Skeleton variant="rectangular" width={210} height={118} />}
                    </TableBody>
                </Table>
            </TableContainer>} </>
            <Popup open={openPopup} setOpen={setOpenPopup} setUpdateData={setUpdateData} updateData={updateData} onSubmit={onSubmit} view={view} addDataPopup={addDataPopup} createPurity={createPurity} setAddDataPopup={setAddDataPopup} />
            <DeletePopup isOpen={isOpen} onClose={() => setIsOpen(false)} onDelete={handleConfirmDelete} />
        </Box>
    );
}

export default PurityManagement;

