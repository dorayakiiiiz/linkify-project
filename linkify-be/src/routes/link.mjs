import { Router } from "express";

const router = Router();


//Thêm link
router.post('/add-link', (req, res) => {
    res.send('Add Link Page');
});

//Xóa link
router.delete('/delete-link', (req, res) => {
    res.send(`Delete Link with ID: ${req.params.id}`);
});

//Cập nhật link
router.patch('/update-link', (req, res) => {
    res.send(`Update Link with ID: ${req.params.id}`);
});


