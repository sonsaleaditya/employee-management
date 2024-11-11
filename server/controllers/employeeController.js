const employeeSchema = require('../models/employee.model');
require('dotenv').config();
const uploadFile = require('./uploader');

const createEmployee = async (req, res) => {
    console.log('Uploaded files:', req.files); // Check what's in req.files
    try {
        const { name, mail, mobile, designation, course, gender } = req.body;
        if (!name || !mail || !mobile || !designation || !course || !gender) {
            return res.status(400).json({
                success: false,
                msg: "All fields are mandatory!"
            });
        }

        const mailExist = await employeeSchema.findOne({mail:mail});
        if(mailExist){
            return res.status(400).json({
                success:false,
                msg:"employee already exist!!"
            })
        }

        const img = req.files.file;  // Check if file exists
        if (!img) {
            return res.status(400).json({
                success: false,
                msg: "Image file is required!"
            });
        }

        const img_url = await uploadFile(img.tempFilePath, 'profile_pictures');
    
        // Check for existing employee by email
        const existingEmployee = await employeeSchema.findOne({ mail });
        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                msg: "Employee with this email already exists!"
            });
        }

        // Create new employee
        const employee = await employeeSchema.create({
            name,
            mail,
            mobile,
            designation,
            course,
            gender,
            image: img_url // Save the uploaded image URL
        });

        return res.status(201).json({
            success: true,
            msg: "Employee created successfully!",
            employee: employee
        });

    } catch (error) {
        console.error("Error in createEmployee:", error);
        return res.status(500).json({
            success: false,
            msg: "Error occurred while creating employee!",
            error: error.message
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params; // get employee ID from request parameters
        const updates = req.body;  // get fields to update from request body

        // Check if employee exists
        const employee = await employeeSchema.findById(id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                msg: "Employee not found!"
            });
        }

        // Update employee fields
        Object.assign(employee, updates);
        
        // If updating image
        if (req.files && req.files.file) {
            const img = req.files.file;
            const img_url = await uploadFile(img.tempFilePath, 'profile_pictures');
            employee.image = img_url;
        }

        await employee.save();

        return res.status(200).json({
            success: true,
            msg: "Employee updated successfully!",
            employee
        });

    } catch (error) {
        console.error("Error in updateEmployee:", error);
        return res.status(500).json({
            success: false,
            msg: "Error occurred while updating employee!",
            error: error.message
        });
    }
};


const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if employee exists
        const employee = await employeeSchema.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                msg: "Employee not found!"
            });
        }

        return res.status(200).json({
            success: true,
            msg: "Employee deleted successfully!"
        });

    } catch (error) {
        console.error("Error in deleteEmployee:", error);
        return res.status(500).json({
            success: false,
            msg: "Error occurred while deleting employee!",
            error: error.message
        });
    }
};


const searchEmployee = async (req, res) => {
    try {
        const { keyword } = req.query;

        const employees = await employeeSchema.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { mail: { $regex: keyword, $options: 'i' } },
                { designation: { $regex: keyword, $options: 'i' } }
            ]
        });

        if (employees.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No employees found!"
            });
        }

        return res.status(200).json({
            success: true,
            employees
        });

    } catch (error) {
        console.error("Error in searchEmployee:", error);
        return res.status(500).json({
            success: false,
            msg: "Error occurred while searching employees!",
            error: error.message
        });
    }
};


const fetchEmployee = async (req, res) => {
    try {
        // Fetch all employees from the database
        const employees = await employeeSchema.find();

        // Check if there are any employees in the database
        if (employees.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No employees found!"
            });
        }

        return res.status(200).json({
            success: true,
            employees
        });

    } catch (error) {
        console.error("Error in fetchEmployee:", error);
        return res.status(500).json({
            success: false,
            msg: "Error occurred while fetching employees!",
            error: error.message
        });
    }
};
const fetchById =  async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
          return  res.status(400).json({
                success:false,
                msg:"id not found"
            })
        }

        const user = await employeeSchema.findById(id);

        return res.status(200).json({
            success:true,
            msg:"data fetched succesfully!",
            user
        })

    } catch (error) {
        return res.status(200).json({
            success:false,
            msg:"error !",
            user
        })
    }
}



module.exports = { createEmployee , updateEmployee, deleteEmployee , searchEmployee , fetchEmployee , fetchById};
