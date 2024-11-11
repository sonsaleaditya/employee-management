const express = require('express');
const {adminSignUp , adminSignIn, fetchByUsername} = require('../controllers/adminCotroller.js');
const { createEmployee, updateEmployee, fetchEmployee, deleteEmployee , searchEmployee, fetchById} = require('../controllers/employeeController.js')
const {auth,isAdmin} = require('../middlewares/auth.js');
const router = express.Router();

router.post('/admin-sign-up',adminSignUp);
router.post('/admin-sign-in',adminSignIn);
router.post('/create-employee', auth,isAdmin, createEmployee);
router.put('/update-employee/:id',auth,isAdmin,updateEmployee);
router.get('/fetch-employee',auth,isAdmin,fetchEmployee);
router.delete('/delete-employee/:id',auth,isAdmin,deleteEmployee);
router.get('/search-employee',auth,isAdmin,searchEmployee);
router.get('/fetch-by-id/:id',auth,isAdmin,fetchById);
router.get('/fetch-by-username/:username', auth, isAdmin, fetchByUsername);
router.post('/auth',auth,isAdmin,(req,res)=>{
   return  res.status(200).json({
        msg:"usr is autheticated & authorized!!"
    })
});



module.exports = router;
