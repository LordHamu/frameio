import { Request, Response } from "express";

// In-memory array to simulate persistent storage
// TODO: Move this to a hashtable to speed up data retrieval.
const users: any[] = [];

function validateUserInput(username: string, email: string, password: string, accountType: string) {
  const missing = [];
  switch (true) {
    case !username || typeof username !== 'string' || username === '':
      missing.push('Username');
      break;
    case !email || typeof email !== 'string' || email === '':
      missing.push('Email');
      break;
    case !password || typeof password !== 'string' || password === '':
      missing.push('Password');
      break;
    case !accountType || typeof accountType !== 'string' || accountType === '':
      missing.push('Account Type');
  }
  return missing;
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, accountType } = req.body;
    const missing = validateUserInput(username, email, password, accountType);
    if (missing.length > 0) {
      const error = `Please include Username, Email, and Password. Request missing: ${missing.join(',')}`
      return res.status(400).json({
        success: false,
        error,
      });
    }
    if (!['creator', 'admin', 'viewer'].includes(accountType.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Account Type not one of known types. Sent: ${accountType}`,
      });
    }
    if (users.find((record) => {
      return record.username === username
    })) {
      return res.status(400).json({
        success: false,
        error: 'User already exists please use the update endpoint to edit data, or delete endpoint to remove it'
      })
    }
    const user = {
      username, email, password, accountType,
    };
    users.push(user);
    return res.status(201).json({
      success: true,
      user
    });
  } catch (err) {
    console.error("Error in createUser:", err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong, please contact support to debug this issue'
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, accountType } = req.body;
    if (!username) {
      return res.status(400).json({
        success: false,
        error: "Please include the Username of the user to update"
      });
    }
    const index = users.findIndex((record) => {
      record.username === username
    });
    if (index < 0) {
      return res.status(400).json({
        success: false,
        error: "User not found, please check username"
      });
    }
    users[index] = {
      username: users[index].username,
      password: password || users[index].password,
      email: email || users[index].email,
      accountType: accountType || users[index].accountType,
    }
    return res.status(200).json({
      success: true,
      user: users[index]
    })
  } catch (err) {
    console.error("Error in createUser:", err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong, please contact support to debug this issue'
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const index = users.findIndex((record) => {
      record.username === username
    });
    if (index < 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found.'
      })
    }
    delete users[index]
    return res.status(200).json({
      success: true
    })
  } catch (err) {
    console.error("Error in createUser:", err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong, please contact support to debug this issue'
    });
  }
};
