import Delegate from "../models/Delegate.js";
import sendEmailWithTemplate from "../utils/sendEmail.js";

// ==========================
// Create Delegate
// ==========================
export const createDelegate = async (req, res) => {
  try {
    const { name, email, title } = req.body;

    if (!name || !email || !title) {
      return res.status(400).json({
        success: false,
        message: "Name, email and title are required",
      });
    }

    const delegate = await Delegate.create({
      name,
      email,
      title,
    });

    res.status(201).json({
      success: true,
      message: "Delegate created successfully",
      data: delegate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Delegates
// ==========================
export const getAllDelegates = async (req, res) => {
  try {
    const delegates = await Delegate.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: delegates.length,
      data: delegates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Delegate By ID
// ==========================
export const getDelegateById = async (req, res) => {
  try {
    const delegate = await Delegate.findById(req.params.id);

    if (!delegate) {
      return res.status(404).json({
        success: false,
        message: "Delegate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: delegate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Delegate
// ==========================
export const updateDelegate = async (req, res) => {
  try {
    const { name, email, title } = req.body;

    const delegate = await Delegate.findById(req.params.id);

    if (!delegate) {
      return res.status(404).json({
        success: false,
        message: "Delegate not found",
      });
    }

    if (name !== undefined) delegate.name = name;
    if (email !== undefined) delegate.email = email;
    if (title !== undefined) delegate.title = title;

    await delegate.save();

    res.status(200).json({
      success: true,
      message: "Delegate updated successfully",
      data: delegate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Delegate
// ==========================
export const deleteDelegate = async (req, res) => {
  try {
    const delegate = await Delegate.findById(req.params.id);

    if (!delegate) {
      return res.status(404).json({
        success: false,
        message: "Delegate not found",
      });
    }

    await delegate.deleteOne();

    res.status(200).json({
      success: true,
      message: "Delegate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Send Email to Single Delegate
// ==========================
export const sendSingleDelegateEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const delegate = await Delegate.findById(id);

    if (!delegate) {
      return res.status(404).json({
        success: false,
        message: "Delegate not found",
      });
    }

    await sendEmailWithTemplate({
      to: delegate.email,
      name: delegate.name,
      templateKey:
        "2518b.554b0da719bc314.k1.89667180-7fb0-11f1-83a3-d2cf08f4ca8c.19f61dae098",
      mergeInfo: {
        delegate_name: delegate.name,
        abstract_title: delegate.title,
      },
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Send Email to All Delegates
// ==========================
export const sendBulkDelegateEmails = async (req, res) => {
  try {
    const delegates = await Delegate.find();

    if (!delegates.length) {
      return res.status(404).json({
        success: false,
        message: "No delegate found.",
      });
    }

    let successCount = 0;
    let failedCount = 0;
    const failedEmails = [];

    for (const delegate of delegates) {
      try {
        await sendEmailWithTemplate({
          to: delegate.email,
          name: delegate.name,
          templateKey:
            "2518b.554b0da719bc314.k1.89667180-7fb0-11f1-83a3-d2cf08f4ca8c.19f61dae098",
          mergeInfo: {
            delegate_name: delegate.name,
            abstract_title: delegate.title,
          },
        });

        successCount++;
      } catch (err) {
        failedCount++;

        failedEmails.push({
          email: delegate.email,
          error: err.message,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Bulk email process completed.",
      total: delegates.length,
      successCount,
      failedCount,
      failedEmails,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
